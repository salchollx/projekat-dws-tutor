import { Link } from 'react-router-dom';
import './Auth.css';

export function Login() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Dobrodošli nazad</h2>
        <p className="auth-subtitle">
          Unesite svoje podatke za pristup platformi.
        </p>

        <form className="auth-form">
          <div className="input-group">
            <label className="input-label">Email adresa</label>
            <input type="email" placeholder="ime@primjer.com" className="auth-input" />
          </div>

          <div className="input-group">
            <label className="input-label">Lozinka</label>
            <input type="password" placeholder="••••••••" className="auth-input" />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
            Prijavi se
          </button>
        </form>

        <p className="auth-footer-text">
          Nemate račun? <Link to="/register" className="auth-link">Registrujte se</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;