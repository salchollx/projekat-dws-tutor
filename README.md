🎓 Tutor Connect - Platforma za spajanje tutora i učenika
=========================================================

Full-stack aplikacija razvijena kao projektno rješenje koje omogućava digitalno povezivanje instruktora i polaznika.

### 🚀 **Produkcijski URL-ovi (Live verzija)**

*   **Frontend aplikacija:** \[OVDJE\_ZALIJEPI\_VERCEL\_LINK\]
    
*   **Backend API:** \[OVDJE\_ZALIJEPI\_RENDER\_LINK\]
    

### 💻 **Upute za lokalno pokretanje**

#### **📋 Preduslovi**

*   **Node.js** (v18.x ili noviji)
    
*   Aktivan **Supabase** projekat sa tabelama profiles i tutors
    

#### **🛠️ Instalacija i pokretanje**

1.  git clone \[LINK\_TVOG\_GITHUB\_REPOZITORIJA\]
    
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
    
2.  **Autentifikacija**
    
3.  **Profil korisnika**
    
4.  **Pretraga tutora**
    
5.  **Mobilna verzija**