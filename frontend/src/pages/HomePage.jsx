export function HomePage() {
  return (
    <main>
      {/* Hero Sekcija */}
      <section style={heroStyle}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
            Uči brže uz pomoć vršnjaka
          </h1>
          <p style={{ fontSize: '18px', marginBottom: '40px', color: 'var(--text-muted)' }}>
            Pronađi studente koji ti mogu pomoći sa programiranjem, matematikom ili dizajnom.
          </p>

          {/* Search Bar */}
          <div style={searchContainerStyle}>
            <input 
              type="text" 
              placeholder="Šta želiš da naučiš? (npr. React, SQL...)" 
              style={inputStyle}
            />
            <button className="btn btn-primary" style={{ borderRadius: '0 8px 8px 0' }}>
              Pretraži
            </button>
          </div>
        </div>
      </section>

      {/* Info Sekcija */}
      <section className="container" style={{ padding: '60px 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Zašto Peer Tutoring?</h2>
        <div style={gridStyle}>
          <div style={cardStyle}>
            <h3>Pristupačno</h3>
            <p>Cijene prilagođene studentskom budžetu.</p>
          </div>
          <div style={cardStyle}>
            <h3>Relevantno</h3>
            <p>Učiš od onih koji su nedavno položili isti ispit.</p>
          </div>
          <div style={cardStyle}>
            <h3>Fleksibilno</h3>
            <p>Dogovori termine koji tebi odgovaraju online.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

const heroStyle = {
  padding: '100px 0',
  background: 'linear-gradient(to bottom, #ffffff, #f0f4ff)',
};

const searchContainerStyle = {
  display: 'flex',
  maxWidth: '600px',
  margin: '0 auto',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  borderRadius: '8px'
};

const inputStyle = {
  flex: 1,
  padding: '15px 20px',
  border: '1px solid var(--border-color)',
  borderRadius: '8px 0 0 8px',
  fontSize: '16px',
  outline: 'none'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px'
};

const cardStyle = {
  padding: '30px',
  background: 'white',
  borderRadius: '12px',
  border: '1px solid var(--border-color)',
  textAlign: 'center'
};

export default HomePage;