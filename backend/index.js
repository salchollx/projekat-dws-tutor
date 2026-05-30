require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // Koristi service_role ključ
);

app.use(cors());
app.use(express.json());

// --- RUTA ZA REGISTRACIJU ---
app.post('/api/register', async (req, res) => {
    const { email, password, fullName, role } = req.body;

    try {
        // 1. KORAK: Kreiranje korisnika u Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) throw authError;

        const userId = authData.user.id;

        // 2. KORAK: Upis u tabelu 'profiles' (ZA SVE KORISNIKE)
        // Pazi: Kolona u bazi ti je vjerovatno 'full_name'
        const { error: profileError } = await supabase
            .from('profiles')
            .insert([
                {
                    id: userId,
                    full_name: fullName,
                    role: role
                }
            ]);

        if (profileError) throw profileError;

        // 3. KORAK: Ako je korisnik TUTOR, kreiramo zapis u 'tutors' tabeli
        if (role === 'tutor') {
            const { error: tutorError } = await supabase
                .from('tutors')
                .insert([
                    {
                        user_id: userId, // Veza sa profile/auth tabelom
                        subject: "Nije definisano",
                        price: 0,
                        rating: 5.0,
                        description: "Novi tutor na platformi."
                        // Ovdje NE šaljemo 'name' jer si rekao da ga nema u ovoj tabeli
                    }
                ]);

            if (tutorError) throw tutorError;
        }

        res.status(201).json({ message: "Registracija uspješna!" });

    } catch (err) {
        console.error("Greška na serveru:", err.message);
        res.status(400).json({ error: err.message });
    }
});

// --- RUTA ZA LOGIN ---
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Prijava na Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) return res.status(401).json({ error: "Pogrešan email ili lozinka" });

        // 2. Dohvatanje profila - BEZ .single() da izbjegnemo onaj crash
        const { data: profiles, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authData.user.id);

        if (profileError) throw profileError;

        // Provjera da li profil uopšte postoji u tabeli
        if (!profiles || profiles.length === 0) {
            return res.status(404).json({ error: "Profil nije pronađen u bazi. Pokušajte ponovnu registraciju." });
        }

        const profileData = profiles[0];

        res.json({
            user: {
                id: authData.user.id,
                email: authData.user.email,
                fullName: profileData.full_name,
                role: profileData.role
            },
            session: authData.session
        });

    } catch (err) {
        console.error("Login greška:", err.message);
        res.status(500).json({ error: "Serverska greška" });
    }
});

app.get('/api/tutors', async (req, res) => {
    try {
        const { subject } = req.query; // Uzimamo ?subject=nešto iz URL-a
        
        let query = supabase
            .from('tutors')
            .select(`
                *,
                profiles:user_id ( 
                    full_name,
                    avatar_url
                )
            `);

        // Ako je korisnik nešto upisao u search, filtriraj po koloni 'subject'
        if (subject && subject !== 'null') {
            query = query.ilike('subject', `%${subject}%`);
        }

        const { data, error } = await query;

        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/tutors/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('tutors')
            .select(`
                *,
                profiles:user_id (
                    full_name,
                    avatar_url
                )
            `)
            .eq('user_id', req.params.id) // Tražimo po user_id jer to šalje URL
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: "Tutor nije pronađen" });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 1. Slanje upita (Student šalje tutoru)
app.post('/api/bookings', async (req, res) => {
    const { tutor_id, student_id, appointment_date, message } = req.body;
    
    // Loguj podatke da vidiš šta stiže sa frontenda
    console.log("Pokušaj bookinga:", { tutor_id, student_id, appointment_date, message });

    try {
        const { data, error } = await supabase
            .from('bookings')
            .insert([
                { 
                    tutor_id, 
                    student_id, 
                    appointment_date, // PROVJERI: Da li se u bazi zove appointment_date ili booking_date?
                    message,
                    status: 'pending' // Eksplicitno postavi početni status
                }
            ])
            .select(); // Dodaj select da vrati kreirani red

        if (error) {
            console.error("Supabase Error kod inserta:", error);
            return res.status(400).json({ error: error.message });
        }

        res.json({ success: true, data });
    } catch (err) {
        console.error("Server Error kod bookinga:", err);
        res.status(500).json({ error: err.message });
    }
});

// 2. Dohvatanje upita za ulogovanog tutora
// 1. Svi upiti vezani za korisnika (i oni koje je primio i koje je poslao)
app.get('/api/dashboard/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { data, error } = await supabase
            .from('bookings')
            .select(`
                *,
                student:student_id (full_name, avatar_url),
                tutor:tutor_id (full_name, avatar_url)
            `)
            .or(`tutor_id.eq.${userId},student_id.eq.${userId}`)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Supabase Error u Dashboardu:", error);
            return res.status(500).json({ error: error.message });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Update statusa (Prihvati/Odbij)
app.patch('/api/bookings/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const { data, error } = await supabase
            .from('bookings')
            .update({ status })
            .eq('id', req.params.id);

        if (error) throw error;
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/users', async (req, res) => {
    try {
        const { data, error } = await supabase.from('profiles').select('*');
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/admin/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // 1. Pokušaj brisanje iz Autha
        const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

        // 2. Čak i ako Auth baci error, provjeri da li je profil obrisan
        // (jer kaskada nekad odradi svoje prije nego što se vrati odgovor)
        const { data: profileCheck } = await supabaseAdmin
            .from('profiles')
            .select('id')
            .eq('id', id)
            .single();

        // Ako profila više nema, smatramo da je brisanje USPJELO
        if (!profileCheck) {
            return res.json({ success: true, message: "Korisnik uspješno uklonjen." });
        }

        if (authError) throw authError;

        res.json({ success: true, message: "Korisnik obrisan." });

    } catch (err) {
        console.error("Greška pri brisanju:", err.message);
        // Ako je korisnik već obrisan (404), nemoj slati 500 nego javi uspjeh
        if (err.status === 404 || err.message.includes("not found")) {
            return res.json({ success: true, message: "Korisnik već obrisan." });
        }
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/profile/:userId', async (req, res) => {
    const { userId } = req.params;
    const { full_name, avatar_url, subject, price, description, role } = req.body;

    try {
        // 1. Update tabele 'profiles' (ovo ti radi)
        const { error: profileError } = await supabase
            .from('profiles')
            .update({ 
                full_name: full_name, 
                avatar_url: avatar_url 
            })
            .eq('id', userId);

        if (profileError) throw profileError;

        // 2. Update tabele 'tutors' (Ovdje je vjerovatno bio problem)
        if (role === 'tutor') {
            const { error: tutorError } = await supabase
                .from('tutors')
                .update({ 
                    subject: subject, 
                    price: Number(price), // Obavezno pretvori u broj
                    description: description 
                })
                .eq('user_id', userId); // Provjeri zove li se kolona user_id!

            if (tutorError) throw tutorError;
        }

        // 3. Dohvati skroz svježe podatke sa JOIN-om da vratiš frontendu
        const { data: updatedUser, error: fetchError } = await supabase
            .from('profiles')
            .select(`
                *,
                tutor_data:tutors(*)
            `)
            .eq('id', userId)
            .single();

        if (fetchError) throw fetchError;

        // Vraćamo finalni objekt
        res.json({ success: true, user: updatedUser });
        
    } catch (err) {
        console.error("Greška na serveru:", err);
        res.status(500).json({ error: err.message });
    }
});

// Brisanje profila
app.delete('/api/profile/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Zahvaljujući CASCADE, brišemo samo iz profiles, a tutors odlazi sam
        const { error } = await supabase
            .from('profiles')
            .delete()
            .eq('id', userId);

        if (error) throw error;
        res.json({ success: true, message: "Korisnik uspješno obrisan" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server pokrenut na portu ${PORT}`));

