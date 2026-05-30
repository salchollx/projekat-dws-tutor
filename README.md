🎓 Tutor Connect - Platforma za spajanje tutora i učenika
=========================================================

Full-stack aplikacija razvijena kao projektno rješenje koje omogućava digitalno povezivanje instruktora i polaznika.

### 🚀 **Produkcijski URL-ovi (Live verzija)**

*   **Frontend aplikacija:** https://peertutor-pi.vercel.app/
    
*   **Backend API:** https://peertutor-n61w.onrender.com
    

### 💻 **Upute za lokalno pokretanje**

#### **📋 Preduslovi**

*   **Node.js** (v18.x ili noviji)
    
*   Aktivan **Supabase** projekat sa tabelama profiles i tutors
    

#### **🛠️ Instalacija i pokretanje**

1.  git clone https://github.com/salchollx/projekat-dws-tutor.git
    
2.  **Postavke Backend-a:**
    
    *   Pozicionirajte se u folder: cd backend
        
    *   Instalacija zavisnosti: npm install
        
    *   Kreirajte **.env** datoteku i unesite:
        
        *   SUPABASE\_URL=tvoj\_supabase\_url
            
        *   SUPABASE\_ANON\_KEY=tvoj\_anon\_key
            
        *   PORT=5000
            
    *   Pokrenite server: node index.js
        
3.  **Postavke Frontend-a:**
    
    *   Pozicionirajte se u folder: cd ../frontend
        
    *   Instalacija zavisnosti: npm install
        
    *   Kreirajte **.env** datoteku i unesite:
        
        *   VITE\_SUPABASE\_URL=tvoj\_supabase\_url
            
        *   VITE\_SUPABASE\_ANON\_KEY=tvoj\_anon\_key
            
        *   VITE\_API\_URL=http://localhost:5000/api
            
    *   Pokrenite aplikaciju: npm run dev
        

### 📝 **Opis projekta**

**Tutor Connect** rješava problem otežanog pronalaska privatnih instruktora. Aplikacija nudi intuitivan interfejs za:

*   **Tutore:** Kreiranje profesionalnog profila sa biografijom, cijenom i predmetima.
    
*   **Učenike:** Filtriranje i pregled tutora prema specifičnim obrazovnim potrebama.
    

### 👥 **Tim i doprinosi**

#### **\[Tvoje Ime i Prezime\]**

**DWS (Dizajn i razvoj web stranica):**

*   Implementacija klijentske logike koristeći **React 18** i **Vite**.
    
*   Razvoj navigacionog sistema i zaštita privatnih ruta.
    
*   Upravljanje stanjima kroz **Context API**.
    
*   Izrada responzivnog UI dizajna prilagođenog svim uređajima.
    

**OSiRuO (Oblikovanje softvera i razvoj u okruženju):**

*   Izrada REST API-ja putem **Node.js** i **Express** okvira.
    
*   Modeliranje i upravljanje relacionom bazom podataka na **Supabase** platformi.
    
*   Sigurnosna autentifikacija i autorizacija korisnika.
    
*   Deployment i konfiguracija CI/CD procesa na **Vercel** i **Render** servisima.
    

### 🛠 **Tech Stack**

*   **Frontend:** React.js (Vite)
    
*   **Backend:** Node.js, Express.js
    
*   **Baza podataka:** PostgreSQL (Supabase)
    
*   **Hosting:** Vercel (Frontend), Render (Backend)
    
*   **Biblioteke:** Axios, React-Toastify, Supabase-JS, CORS
    

### 📐 **Arhitekturni dijagram**

\[ KLIJENT: React (Vercel) \] <--- HTTPS (REST) ---> \[ SERVER: Node.js (Render) \] <--- SQL ---> \[ BAZA: Supabase \]

### 🎨 **Dizajn sistem**

*   **Primarna boja:** Indigo (#4f46e5)
    
*   **Pozadina:** Light Gray (#f3f4f6)
    
*   **Upozorenja:** Red (#ef4444)
    
*   **Tipografija:** Inter (Sans-serif)
    

### 👥 **Korisničke uloge**

*   **Gost:** Pregled početnih informacija i landing stranice.
    
*   **Učenik:** Pretraga baze instruktora i modifikacija ličnog profila.
    
*   **Tutor:** Puna kontrola nad tutorskim profilom (cijena, biografija, predmeti).
    

### 📸 **Snimci ekrana (Screenshots)**

1.  **Početna stranica** 
<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/fa8908f9-18cd-47f8-96da-4c8ce9a351d9" />

2.  **Autentifikacija** 
<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/1d1e3051-23ca-4d9b-804f-889549052e5c" />

3.  **Profil korisnika**
<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/833bee41-e5d5-4919-89e8-77c3823f0b15" />

4.  **Pretraga tutora**
<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/fbca9366-8e6b-46b9-99d7-c902891edc5b" />
