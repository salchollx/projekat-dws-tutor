import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Auth.css';

export function Register() {
  const navigate = useNavigate();
  
  // State za formu
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  // Handle input promjene
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Osnovna validacija (ostaje ista kao tvoja)
  if (formData.password !== formData.confirmPassword) {
    return toast.error("Lozinke se ne podudaraju!");
  }
  if (formData.password.length < 8) {
    return toast.error("Lozinka mora imati barem 8 karaktera!");
  }

  try {
    // 2. Šaljemo JEDAN zahtjev našem Node.js serveru
    // On će u sebi sadržavati sve podatke, a server će znati šta s njima
    const response = await axios.post('http://localhost:5000/api/register', {
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      role: formData.role
    });

    toast.success("Registracija uspješna! Prijavite se.");
    navigate('/login');
    
  } catch (error) {
    // Ako server vrati grešku (npr. korisnik već postoji), ispisujemo je
    const errorMsg = error.response?.data?.error || "Greška prilikom registracije.";
    toast.error(errorMsg);
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Kreiraj račun</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Ime i prezime</label>
            <input 
              name="fullName"
              type="text" 
              required 
              className="auth-input" 
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Email adresa</label>
            <input 
              name="email"
              type="email" 
              required 
              className="auth-input" 
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Želim da budem:</label>
            <select 
              name="role"
              required 
              className="auth-select" 
              value={formData.role}
              onChange={handleChange}
            >
              <option value="" disabled>Odaberi ulogu...</option>
              <option value="student">Student (želim da učim)</option>
              <option value="tutor">Tutor (želim da predajem)</option> 
              <option value="admin">Admin (za potrebe testa)</option> 
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Lozinka</label>
            <input 
              name="password"
              type="password" 
              required 
              className="auth-input" 
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Potvrdi lozinku</label>
            <input 
              name="confirmPassword"
              type="password" 
              required 
              className="auth-input" 
              onChange={handleChange}
            />
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