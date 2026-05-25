import { useParams, Link } from 'react-router-dom';
import './TutorProfile.css';

export function TutorProfile() {
  const { id } = useParams(); // Uzimamo ID iz URL-a

  // Privremeni "mock" podaci dok ne uvezemo json-server
  const tutor = {
    id: id,
    name: "Amar Selimović",
    subject: "Programiranje (React, Node.js)",
    rating: 4.9,
    price: 25,
    education: "Student 4. godine, Elektrotehnički fakultet Sarajevo",
    description: "Specijalizovan sam za frontend razvoj i rad sa modernim JavaScript framework-ovima. Pomažem kolegama da savladaju osnove React-a, rad sa API-jima i state management.",
    experience: "Preko 20 uspješnih instrukcija i 3 završena timska projekta.",
    image: "https://i.pravatar.cc/150?u=amar"
  };

  return (
    <div className="container tutor-profile-page">
      <div className="profile-grid">
        
        {/* Lijeva kolona - Informacije */}
        <div className="profile-main">
          <Link to="/search" className="back-link">← Nazad na pretragu</Link>
          <div className="profile-header-info">
            <img src={tutor.image} alt={tutor.name} className="profile-img-large" />
            <div>
              <h1>{tutor.name}</h1>
              <p className="profile-subject-tag">{tutor.subject}</p>
              <div className="profile-stats">
                <span>⭐ {tutor.rating} (12 recenzija)</span>
                <span>📍 Online / Uživo</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3>O meni</h3>
            <p>{tutor.description}</p>
          </div>

          <div className="profile-section">
            <h3>Obrazovanje i iskustvo</h3>
            <p><strong>Obrazovanje:</strong> {tutor.education}</p>
            <p><strong>Iskustvo:</strong> {tutor.experience}</p>
          </div>
        </div>

        {/* Desna kolona - Rezervacija (Dodatna forma - Zahtjev 2.3) */}
        <aside className="booking-card">
          <div className="booking-header">
            <span className="price-big">{tutor.price} KM</span>
            <span className="unit">/ po satu</span>
          </div>
          
          <form className="auth-form booking-form">
            <div className="input-group">
              <label className="input-label">Datum</label>
              <input type="date" className="auth-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Poruka za tutora</label>
              <textarea className="auth-input" placeholder="Koji predmet/oblast vas zanima?" rows="3"></textarea>
            </div>
            <button type="button" className="btn btn-primary" style={{width: '100%'}}>
              Pošalji upit za termin
            </button>
          </form>
          <p className="booking-note">Besplatno otkazivanje do 24h prije termina.</p>
        </aside>

      </div>
    </div>
  );
}

export default TutorProfile;