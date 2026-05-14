// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav style={navStyle}>
      <div className="container" style={containerStyle}>
        {/* Logo */}
        <Link to="/" style={logoStyle}>
          Peer<span style={{ color: 'var(--primary-color)' }}>Tutor</span>
        </Link>

        {/* Linkovi */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/search" style={linkStyle}>Traži tutora</Link>
          <Link to="/login" style={linkStyle}>Prijava</Link>
          <Link to="/register" className="btn btn-primary" style={{ padding: '8px 16px' }}>
            Postani tutor
          </Link>
        </div>
      </div>
    </nav>
  );
}

const navStyle = {
  height: '70px',
  background: 'white',
  borderBottom: '1px solid var(--border-color)',
  display: 'flex',
  alignItems: 'center'
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px'
};

const logoStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  textDecoration: 'none',
  color: 'var(--text-main)'
};

const linkStyle = {
  textDecoration: 'none',
  color: 'var(--text-muted)',
  fontWeight: '500'
};

export default Navbar;