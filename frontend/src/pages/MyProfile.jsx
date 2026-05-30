import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { createClient } from '@supabase/supabase-js';
import API from '../api';
import { toast } from 'react-toastify';
import './MyProfile.css';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function MyProfile() {
  const { user, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    avatar_url: '',
    subject: '',
    price: '',
    description: ''
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: ''
  });

  // Sinkronizacija sa user objektom - KLJUČNO ZA OSVJEŽAVANJE NAKON SAVE-A
  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        avatar_url: user.avatar_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        subject: user.tutor_data?.subject || '',
        price: user.tutor_data?.price || '',
        description: user.tutor_data?.description || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, avatar_url: previewUrl, rawFile: file }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalUrl = formData.avatar_url;

      // 1. Upload slike ako postoji novi fajl
      if (formData.rawFile) {
        const fileName = `${user.id}-${Date.now()}`;
        const { error: uploadError } = await supabase.storage
          .from('avatars').upload(fileName, formData.rawFile);
        
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
        finalUrl = data.publicUrl;
      }

      // 2. Slanje podataka backendu
      const res = await API.put(`/profile/${user.id}`, {
        full_name: formData.full_name,
        avatar_url: finalUrl,
        subject: formData.subject,
        price: formData.price,
        description: formData.description,
        role: user.role
      });

      // 3. Ažuriranje globalnog state-a (Context)
      if (res.data.user) {
        login(res.data.user);
        setIsEditing(false); // Zatvara edit mode
        toast.success("Profil uspješno ažuriran!");
      }
    } catch (err) {
      console.error("Greška pri čuvanju:", err);
      toast.error(err.response?.data?.error || "Greška pri spremanju!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Jeste li sigurni? Ova akcija će trajno obrisati vaš račun.")) {
      try {
        await API.delete(`/profile/${user.id}`);
        toast.info("Račun obrisan.");
        logout();
      } catch (err) {
        toast.error("Greška pri brisanju računa.");
      }
    }
  };

  if (!user) return <div className="p-10 text-center">Učitavanje...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="user-info">
            <div className="avatar-wrapper">
              <img src={formData.avatar_url} alt="Profile" className="profile-img-preview" />
              {isEditing && (
                <label htmlFor="fileInput" className="upload-badge">
                  <i className="fas fa-camera"></i>
                </label>
              )}
              <input id="fileInput" type="file" hidden onChange={handleImageChange} disabled={!isEditing} accept="image/*" />
            </div>
            <h3>{formData.full_name || 'Korisnik'}</h3>
            <p className="user-role">{user.role}</p>
          </div>

          <nav className="profile-menu">
            <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
              <i className="fas fa-user-circle"></i> Moj Profil
            </button>
            <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
              <i className="fas fa-cog"></i> Postavke
            </button>
            <button className="logout-link" onClick={logout}>
              <i className="fas fa-sign-out-alt"></i> Odjavi se
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="profile-main">
          {activeTab === 'profile' ? (
            <form onSubmit={handleSave} className="profile-card animate-fade">
              <div className="card-header">
                <h2>Lični podaci</h2>
                {!isEditing ? (
                  <button type="button" className="btn-edit" onClick={() => setIsEditing(true)}>Uredi</button>
                ) : (
                  <div className="edit-actions">
                    <button type="button" className="btn-cancel" onClick={() => {
                        setIsEditing(false);
                        // Resetujemo formu na originalne podatke iz user objekta
                        setFormData({
                            full_name: user.full_name || '',
                            avatar_url: user.avatar_url || '',
                            subject: user.tutor_data?.subject || '',
                            price: user.tutor_data?.price || '',
                            description: user.tutor_data?.description || ''
                        });
                    }}>Otkaži</button>
                    <button type="submit" className="btn-save" disabled={loading}>
                      {loading ? 'Spremanje...' : 'Sačuvaj'}
                    </button>
                  </div>
                )}
              </div>

              <div className="form-grid">
                <div className="input-box">
                  <label>Ime i prezime</label>
                  <input name="full_name" value={formData.full_name} onChange={handleChange} disabled={!isEditing} placeholder="Vaše ime" />
                </div>

                {user.role === 'tutor' && (
                  <>
                    <div className="input-box">
                      <label>Predmet</label>
                      <input name="subject" value={formData.subject} onChange={handleChange} disabled={!isEditing} placeholder="Npr. Matematika" />
                    </div>
                    <div className="input-box">
                      <label>Cijena (KM/h)</label>
                      <input name="price" type="number" value={formData.price} onChange={handleChange} disabled={!isEditing} placeholder="0.00" />
                    </div>
                    <div className="input-box full">
                      <label>Biografija</label>
                      <textarea name="description" value={formData.description} onChange={handleChange} disabled={!isEditing} rows="5" placeholder="Kratak opis vašeg iskustva..." />
                    </div>
                  </>
                )}
              </div>
            </form>
          ) : (
            <div className="profile-card animate-fade">
              <div className="settings-section">
                <h2>Sigurnost i lozinka</h2>
                <div className="form-grid" style={{marginTop: '20px'}}>
                  <div className="input-box">
                    <label>Trenutna lozinka</label>
                    <input type="password" placeholder="********" onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})} />
                  </div>
                  <div className="input-box">
                    <label>Nova lozinka</label>
                    <input type="password" placeholder="Unesite novu lozinku" onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} />
                  </div>
                </div>
                <button className="btn-edit" style={{marginTop: '15px'}} onClick={() => toast.info("Funkcija promjene lozinke uskoro!")}>Promijeni lozinku</button>
              </div>

              <hr style={{margin: '40px 0', border: 'none', borderTop: '1px solid #eee'}} />

              <div className="settings-section">
                <h2 style={{color: '#ef4444'}}>Opasna zona</h2>
                <div className="setting-item danger" style={{marginTop: '20px'}}>
                  <div>
                    <h4>Obriši račun</h4>
                    <p>Jednom kada obrišete račun, više nema povratka. Svi vaši podaci će biti uklonjeni.</p>
                  </div>
                  <button className="btn-danger" onClick={handleDeleteAccount}>Obriši račun</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default MyProfile;