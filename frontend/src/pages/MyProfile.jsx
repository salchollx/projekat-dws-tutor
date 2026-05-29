import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Auth.css';

const supabase = createClient('https://sputulxymzyxngigzega.supabase.co', 'SUPABASE_KEY');

export function MyProfile() {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    avatarUrl: '',
    subject: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.full_name || '',
        avatarUrl: user.avatar_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        subject: user.tutor_data?.subject || '',
        price: user.tutor_data?.price || '',
        description: user.tutor_data?.description || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2000000) {
      return toast.error("Slika je prevelika! Maksimalno 2MB.");
    }

    // Za preview odmah na frontendu koristimo privremeni URL
    const previewUrl = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, avatarUrl: previewUrl, rawFile: file }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalAvatarUrl = formData.avatarUrl;

      // 1. Ako imamo novi fajl (rawFile), šaljemo ga u Bucket
      if (formData.rawFile) {
        const file = formData.rawFile;
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Math.random()}.${fileExt}`; // Unikatan naziv
        const filePath = `${fileName}`;

        // Upload u bucket 'avatars'
        let { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Uzmi javni URL slike
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        finalAvatarUrl = publicUrl;
      }

      // 2. Sada šaljemo URL i ostale podatke tvom backendu da osvježi bazu
      const updateData = {
        full_name: formData.fullName,
        avatar_url: finalAvatarUrl,
        role: user.role,
        subject: formData.subject,
        price: formData.price,
        description: formData.description
      };

      const response = await axios.put(`http://localhost:5000/api/profile/${user.id}`, updateData);

      login(response.data.user);
      setIsEditing(false);
      toast.success("Profil uspješno ažuriran!");
    } catch (error) {
      console.error("Greška:", error);
      toast.error("Neuspješan upload ili spašavanje.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="container">Molimo prijavite se.</div>;

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      <div className="auth-card" style={{ maxWidth: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Moj Profil</h2>

        <form className="auth-form" onSubmit={handleSave}>
          <div className="input-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{ position: 'relative', cursor: isEditing ? 'pointer' : 'default' }}
              onClick={() => isEditing && document.getElementById('fileInput').click()}
            >
              <img
                src={formData.avatarUrl}
                alt="Profilna"
                style={{
                  width: '150px', height: '150px', borderRadius: '50%',
                  objectFit: 'cover', border: '4px solid var(--primary-color)',
                  opacity: isEditing ? 0.7 : 1, transition: '0.3s'
                }}
              />
              {isEditing && <div className="upload-overlay">PROMIJENI SLIKU</div>}
            </div>
            <input id="fileInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
          </div>

          <div className="input-group">
            <label className="input-label">Ime i prezime</label>
            <input name="fullName" className="auth-input" value={formData.fullName} onChange={handleChange} disabled={!isEditing} />
          </div>

          {user.role === 'tutor' && (
            <>
              <div className="input-group">
                <label className="input-label">Predmet/Vještina</label>
                <input name="subject" className="auth-input" value={formData.subject} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div className="input-group">
                <label className="input-label">Cijena po satu (KM)</label>
                <input name="price" type="number" className="auth-input" value={formData.price} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div className="input-group">
                <label className="input-label">Biografija</label>
                <textarea name="description" className="auth-input" value={formData.description} onChange={handleChange} disabled={!isEditing} rows="4" />
              </div>
            </>
          )}

          <div style={{ marginTop: '20px' }}>
            {isEditing ? (
              <div style={{ display: 'flex', gap: '15px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
                  {loading ? 'Spašavanje...' : 'Sačuvaj promjene'}
                </button>
                <button type="button" className="btn" onClick={() => setIsEditing(false)} style={{ flex: 1, background: '#ccc' }}>
                  Odustani
                </button>
              </div>
            ) : (
              <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={() => setIsEditing(true)}>
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