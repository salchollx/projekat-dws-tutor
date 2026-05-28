import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Auth.css';

export function MyProfile() {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    image: '',
    subject: '',
    price: '',
    description: '',
    role: ''
  });

  // Učitavanje podataka čim se komponenta pokrene
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        image: user.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        subject: user.subject || '',
        price: user.price || '',
        description: user.description || '',
        role: user.role || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ... unutar MyProfile komponente, iznad handleSave funkcije dodaj ovo:

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Provjera veličine fajla (opciono, npr. max 2MB)
    if (file.size > 2000000) {
      return toast.error("Slika je prevelika! Maksimalno 2MB.");
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      // Ovo pretvara sliku u Base64 string
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  }
};

// ...
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // 1. Ažuriramo glavnu tabelu 'users'
      const updatedUser = { ...user, ...formData };
      await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);
      
      // 2. Ako je korisnik tutor, ažuriramo i 'tutors' tabelu
      if (user.role === 'tutor') {
        const tutorRes = await axios.get(`http://localhost:5000/tutors?userId=${user.id}`);
        if (tutorRes.data.length > 0) {
          const tutorId = tutorRes.data[0].id;
          const updatedTutor = {
            ...tutorRes.data[0],
            name: formData.fullName,
            image: formData.image,
            subject: formData.subject,
            price: Number(formData.price),
            description: formData.description
          };
          await axios.put(`http://localhost:5000/tutors/${tutorId}`, updatedTutor);
        }
      }

      // 3. Ažuriramo lokalni state i Context
      login(updatedUser); 
      setIsEditing(false);
      toast.success("Profil uspješno ažuriran!");
    } catch (error) {
      console.error(error);
      toast.error("Greška prilikom spašavanja podataka.");
    }
  };

  if (!user) return <div className="container">Molimo prijavite se.</div>;

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      <div className="auth-card" style={{ maxWidth: '100%' }}>

        <form className="auth-form" onSubmit={handleSave}>

          {/* Zamijeni stari input za URL slike ovim */}
        <div className="input-group" style={{ alignItems: 'center' }}>
        <label className="input-label">Profilna fotografija</label>
  
            <div style={{ position: 'relative', cursor: isEditing ? 'pointer' : 'default' }}>
            <img 
              src={formData.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
              alt="Profilna" 
              style={{ 
              width: '150px', 
                height: '150px', 
                borderRadius: '50%', 
                objectFit: 'cover', 
                border: '4px solid var(--primary-color)',
                opacity: isEditing ? 0.7 : 1
              }} 
              onClick={() => isEditing && document.getElementById('fileInput').click()}
            />
            {isEditing && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                fontSize: '12px',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                KLIKNI ZA IZMJENU
              </div>
         )}
         </div>

         <input 
           id="fileInput"
           type="file"
           accept="image/*"
           style={{ display: 'none' }}
           onChange={handleImageChange}
           disabled={!isEditing}
         />
         <small style={{ color: 'var(--text-muted)', marginTop: '5px' }}>
           Preporučeno: Kvadratna slika, max 2MB.
         </small>
        </div>

          <div className="input-group">
            <label className="input-label">Ime i prezime</label>
            <input 
              name="fullName"
              className="auth-input" 
              value={formData.fullName} 
              onChange={handleChange} 
              disabled={!isEditing} 
            />
          </div>

          {user.role === 'tutor' && (
            <>
              <div className="input-group">
                <label className="input-label">Predmet/Vještina</label>
                <input 
                  name="subject"
                  className="auth-input" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  placeholder="npr. Matematika, React, Engleski..."
                />
              </div>
              <div className="input-group">
                <label className="input-label">Cijena po satu (KM)</label>
                <input 
                  name="price"
                  type="number"
                  className="auth-input" 
                  value={formData.price} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                />
              </div>
              <div className="input-group">
                <label className="input-label">Kratka biografija</label>
                <textarea 
                  name="description"
                  className="auth-input" 
                  value={formData.description} 
                  onChange={handleChange} 
                  disabled={!isEditing}
                  rows="4"
                  style={{resize: 'none'}}
                />
              </div>
            </>
          )}

          <div style={{ marginTop: '20px' }}>
            {isEditing ? (
              <div style={{ display: 'flex', gap: '15px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Sačuvaj promjene
                </button>
                <button 
                  type="button" 
                  className="btn" 
                  onClick={() => setIsEditing(false)} 
                  style={{ flex: 1, background: '#eee', color: '#333' }}
                >
                  Odustani
                </button>
              </div>
            ) : (
              <button 
                type="button" 
                className="btn btn-primary" 
                style={{ width: '100%' }}
                onClick={() => setIsEditing(true)}
              >
                Uredi profil
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyProfile;