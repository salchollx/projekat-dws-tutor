import './Contact.css';
import './Auth.css'; // Koristimo iste stilove za inpute kao na login/register

export function Contact() {
  return (
    <div className="container" style={{padding: '60px 20px'}}>
      <h1 style={{textAlign: 'center'}}>Kontaktirajte nas</h1>
      <p style={{textAlign: 'center', color: 'var(--text-muted)'}}>Tu smo za sva vaša pitanja.</p>

      <div className="contact-grid">
        {/* Kontakt Forma */}
        <div className="auth-card" style={{maxWidth: '100%'}}>
          <form className="auth-form">
            <div className="input-group">
              <label className="input-label">Ime i prezime</label>
              <input type="text" placeholder="Vaše ime" className="auth-input" required />
            </div>
            <div className="input-group">
              <label className="input-label">Email</label>
              <input type="email" placeholder="vas@email.com" className="auth-input" required />
            </div>
            <div className="input-group">
              <label className="input-label">Poruka</label>
              <textarea 
                className="auth-input" 
                rows="5" 
                placeholder="Kako vam možemo pomoći?"
                style={{resize: 'none'}}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Pošalji poruku</button>
          </form>
        </div>

        {/* Google Maps (Zahtjev 2.7) */}
        <div className="map-container">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2860.3728421137307!2d17.900876976205836!3d44.19938687108157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475ee2423fa0fbaf%3A0xd5caf50678c02195!2sPolitehni%C4%8Dki%20fakultet%20Univerziteta%20u%20Zenici!5e0!3m2!1sen!2sba!4v1779725213607!5m2!1sen!2sba" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;