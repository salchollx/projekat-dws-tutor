import './HomePage.css';

export function HomePage() {
  return (
    <main>
      {/* Hero Sekcija */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">Uči brže uz pomoć vršnjaka</h1>
          <p className="hero-subtitle">
            Pronađi studente koji ti mogu pomoći sa programiranjem, matematikom ili dizajnom.
          </p>

          {/* Search Bar */}
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Šta želiš da naučiš? (npr. React, SQL...)" 
              className="search-input"
            />
            <button className="btn btn-primary" style={{ borderRadius: '0 8px 8px 0' }}>
              Pretraži
            </button>
          </div>
        </div>
      </section>

      {/* Info Sekcija */}
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