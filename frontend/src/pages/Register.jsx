import { Link } from 'react-router-dom';
import './Auth.css';

export function Register() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Kreiraj račun</h2>
        <p className="auth-subtitle">
          Pridruži se zajednici i počni učiti.
        </p>

        <form className="auth-form">
          <div className="input-group">
            <label className="input-label">Ime i prezime</label>
            <input type="text" placeholder="Marko Marković" className="auth-input" />
          </div>

          <div className="input-group">
            <label className="input-label">Email adresa</label>
            <input type="email" placeholder="ime@primjer.com" className="auth-input" />
          </div>

          <div className="input-group">
            <label className="input-label">Želim da budem:</label>
            <select required className="auth-select" defaultValue="">
              <option value="" disabled hidden>
                Odaberi svoju primarnu ulogu...
              </option>
              <option value="student">Želim da učim (Student)</option>
              <option value="tutor">Želim da podučavam (Tutor)</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Lozinka</label>
            <input type="password" placeholder="Minimalno 8 karaktera" className="auth-input" />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
            Napravi račun
          </button>
        </form>

        <p className="auth-footer-text">
          Već imate račun? <Link to="/login" className="auth-link">Prijavite se</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;