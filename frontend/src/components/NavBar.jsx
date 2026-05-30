import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './NavBar.css';

export function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          PeerTutor<span className="logo-dot"></span>
        </Link>

        <div className="nav-links">
          <NavLink to="/" className="nav-link">Početna</NavLink>
          <NavLink to="/search" className="nav-link">Pronađi tutora</NavLink>

          {/* 1. LINKOVI ZA ULOGOVANE KORISNIKE */}
          {user && (
            <>
              {/* Ako NIJE admin, prikaži Dashboard (Tutor Panel ili Moji Upiti) */}
              {user.role !== 'admin' && (
                <>
                  <NavLink to="/dashboard" className="nav-link">
                    {user.role === 'tutor' ? 'Tutor Panel' : 'Moji Upiti'}
                  </NavLink>
                  <NavLink to="/profile" className="nav-link">Profil</NavLink>
                </>
              )}

              {/* Ako JE admin, prikaži SAMO Admin Panel */}
              {user.role === 'admin' && (
                <NavLink to="/admin-dashboard" className="nav-link admin-link">
                  🛡️ Admin Panel
                </NavLink>
              )}
            </>
          )}

          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/contact" className="nav-link">Kontakt</NavLink>
          
          <div className="nav-auth-btns">
            {user ? (
              <>
                <span className="user-name">
                  Zdravo, {user.fullName ? user.fullName.split(' ')[0] : 'Korisniče'}
                </span>
                <button onClick={handleLogout} className="btn-login">Odjavi se</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-login">Prijava</Link>
                <Link to="/register" className="btn-nav-primary">Postani tutor</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}