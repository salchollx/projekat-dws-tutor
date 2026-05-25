import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importuj hook
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
          
          {/* Ako je ADMIN, prikaži link za Admin Panel */}
          {user?.role === 'admin' && (
            <NavLink to="/admin" className="nav-link" style={{color: 'red'}}>Admin Panel</NavLink>
          )}

          <div className="nav-auth-btns">
            {user ? (
              <>
                <span className="user-name">Zdravo, {user.fullName.split(' ')[0]}</span>
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