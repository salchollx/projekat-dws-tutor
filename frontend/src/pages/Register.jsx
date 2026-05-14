import { Link } from 'react-router-dom';

export function Register() {
  return (
    <div style={authContainerStyle}>
      <div style={authCardStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Kreiraj račun</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '30px' }}>
          Pridruži se zajednici i počni učiti.
        </p>

        <form style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Ime i prezime</label>
            <input type="text" placeholder="Marko Marković" style={inputStyle} />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email adresa</label>
            <input type="email" placeholder="ime@primjer.com" style={inputStyle} />
          </div>

          {/* Izbor uloge */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Želim da budem:</label>
            <select required className="auth-select">
                <option value="" disabled selected hidden>
                  Odaberi svoju primarnu ulogu...
                </option>
                <option value="student">Želim da učim (Student)</option>
                <option value="tutor">Želim da podučavam (Tutor)</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Lozinka</label>
            <input type="password" placeholder="Minimalno 8 karaktera" style={inputStyle} />
          </div>

          <button className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
            Napravi račun
          </button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
          Već imate račun? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Prijavite se</Link>
        </p>
      </div>
    </div>
  );
}

const authContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 'calc(100vh - 70px)', // Ostatak ekrana ispod navbar-a
  background: '#f1f5f9'
};

const authCardStyle = {
  background: 'white',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
  width: '100%',
  maxWidth: '400px'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
};

const labelStyle = {
  fontSize: '14px',
  fontWeight: '600',
  color: 'var(--text-main)'
};

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid var(--border-color)',
  fontSize: '16px',
  outline: 'none'
};

export default Register;