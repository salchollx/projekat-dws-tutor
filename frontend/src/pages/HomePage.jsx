import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Šaljemo ga na /search (provjeri u App.jsx da li ti je to putanja)
    navigate(`/search?subject=${query}`);
  };

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">Uči brže uz pomoć vršnjaka</h1>
          <p className="hero-subtitle">
            Pronađi studente koji ti mogu pomoći sa programiranjem, matematikom ili dizajnom.
          </p>

          <form className="search-container" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Šta želiš da naučiš? (npr. React, SQL...)" 
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '0 8px 8px 0' }}>
              Pretraži
            </button>
          </form>
        </div>
      </section>

      <section className="container info-section">
        <h2 className="info-title">Zašto Peer Tutoring?</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Pristupačno</h3>
            <p>Cijene prilagođene studentskom budžetu.</p>
          </div>
          <div className="info-card">
            <h3>Relevantno</h3>
            <p>Učiš od onih koji su nedavno položili isti ispit.</p>
          </div>
          <div className="info-card">
            <h3>Fleksibilno</h3>
            <p>Dogovori termine koji tebi odgovaraju online.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;