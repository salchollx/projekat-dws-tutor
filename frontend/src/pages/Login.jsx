import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext'; // Koristimo naš Context
import './Auth.css';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Uzimamo login funkciju iz Context-a

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/login', {
            email: formData.email,
            password: formData.password
        });

        // 'login' je funkcija iz tvog AuthContext-a
        // Sada joj šaljemo podatke koje je vratio naš Node.js server
        login(response.data.user); 
        
        toast.success(`Dobrodošli nazad, ${response.data.user.fullName}!`);
        navigate('/');
    } catch (error) {
        const msg = error.response?.data?.error || "Prijava nije uspjela";
        toast.error(msg);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Dobrodošli nazad</h2>
        <p className="auth-subtitle">Unesite podatke za pristup platformi.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Email adresa</label>
            <input 
              name="email"
              type="email" 
              required 
              className="auth-input" 
              placeholder="ime@primjer.com"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Lozinka</label>
            <input 
              name="password"
              type="password" 
              required 
              className="auth-input" 
              placeholder="••••••••"
              onChange={handleChange}
            />
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