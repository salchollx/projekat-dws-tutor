import './About.css';

export function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <span className="about-badge">Naša Priča</span>
        <h1>Povezujemo znanje i ambiciju</h1>
        <p className="about-subtitle">
          PeerTutor je nastao iz potrebe da učenje postane dostupnije, 
          zabavnije i prilagođeno studentima.
        </p>
      </header>

      <div className="about-content">
        <section className="about-section">
          <h2>Šta je PeerTutor?</h2>
          <p>
            PeerTutor je platforma koja omogućava studentima da pronađu pomoć 
            iz različitih predmeta direktno od svojih vršnjaka koji su te 
            predmete već uspješno savladali. Vjerujemo da niko ne može 
            objasniti gradivo bolje od nekoga ko je nedavno bio u istoj klupi.
          </p>
        </section>

        <div className="about-grid">
          <div className="mission-card">
            <h3>Naša Misija</h3>
            <p>
              Demokratizacija znanja i stvaranje zajednice u kojoj svako 
              ima priliku da napreduje uz podršku vršnjaka.
            </p>
          </div>
          <div className="mission-card">
            <h3>Naša Vizija</h3>
            <p>
              Postati centralno mjesto za razmjenu akademskih vještina na 
              svim univerzitetima u regionu.
            </p>
          </div>
        </div>

        <section className="team-section">
          <h2>Zašto odabrati nas?</h2>
          <ul className="about-list">
            <li><strong>Personalizovano učenje:</strong> Tvoj tutor, tvoj tempo.</li>
            <li><strong>Provjereni tutori:</strong> Sistem ocjenjivanja osigurava kvalitet.</li>
            <li><strong>Ušteda vremena:</strong> Brzo pronađi pomoć baš onda kad ti treba.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default About;