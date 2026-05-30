Tutor Connect - Platforma za spajanje tutora i učenika

Produkcijski URL-ovi (Live verzija)
Frontend aplikacija: https://peertutor-pi.vercel.app/

Backend API: https://peertutor-n61w.onrender.com

Upute za lokalno pokretanje

Koristeni alati:
Frontend - React v19.2.6
Backend - Node v24.15.0
DataBase - Supabase

Preduslovi
Instaliran Node.js v24.15.0
Aktivan Supabase projekat sa tabelama profiles i tutors

Instalacija i pokretanje
Klonirajte repozitorij sa GitHub-a.

Backend setup:

Uđite u folder backend.

Izvršite komandu npm install.

Kreirajte .env datoteku sa SUPABASE_URL i SUPABASE_ANON_KEY.

Pokrenite server komandom node index.js.

Frontend setup:

Uđite u folder frontend.

Izvršite komandu npm install.

Kreirajte .env datoteku sa VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY i VITE_API_URL (podešen na localhost:5000).

Pokrenite aplikaciju komandom npm run dev.

Kratak opis projekta
Tutor Connect je full-stack aplikacija koja omogućava korisnicima da se registruju kao tutori ili učenici. Tutori mogu kreirati svoje profile, postavljati cijene usluga i predmete koje predaju, dok učenici mogu pretraživati dostupne instruktore. Cilj je digitalizacija i ubrzavanje procesa pronalaženja privatnih časova.

Članovi tima i doprinosi
Haris Salcin
DWS (Dizajn i razvoj web stranica):

Razvoj korisničkog interfejsa koristeći React 18 i Vite.

Implementacija navigacije i zaštite ruta (Protected Routes).

Upravljanje globalnim stanjima korisnika putem Context API-ja.

Responzivni dizajn i stilizacija komponenti.

OSiRuO (Oblikovanje softvera i razvoj u okruženju):

Razvoj REST API servera koristeći Node.js i Express.

Integracija i upravljanje bazom podataka na Supabase (PostgreSQL) platformi.

Implementacija logike za autentifikaciju i autorizaciju korisnika.

Deployment aplikacije na Vercel (frontend) i Render (backend) platforme.

Tech Stack
Frontend: React 18 (Vite)

Backend: Node.js, Express.js

Baza podataka: PostgreSQL (Supabase)

Hosting: Vercel & Render

Biblioteke: Axios (API klijent), React-Toastify (Notifikacije), Supabase-JS


Dizajn sistem
Boje: Primarna Indigo (#4f46e5), Pozadina (#f3f4f6), Danger (#ef4444).

Font: Inter (Sans-serif).

Korisničke uloge
Neregistrovani korisnik: Može pristupiti landing stranici.

Učenik: Može pretraživati tutore i uređivati svoj osnovni profil.

Tutor: Ima proširen profil sa podacima o predmetu, cijeni i biografiji.

Snimci ekrana (Screenshots)

Početna stranica (Landing page)

Login/Registracija

Profil korisnika (Uređivanje podataka)

Pretraga tutora (Lista dostupnih instruktora)

Mobilni prikaz (Responzivnost aplikacije)