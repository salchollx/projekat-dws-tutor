import { useState, useEffect } from 'react';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export function Dashboard() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        if (!user) return;
        try {
            const res = await API.get(`/dashboard/${user.id}`);
            console.log("PODACI KOJI SU STIGLI:", res.data); // OVO DODAJ
            setBookings(res.data);
        } catch (err) {
            console.error("Greška:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBookings(); }, [user]);

    const updateStatus = async (id, newStatus) => {
        try {
            await API.patch(`/bookings/${id}/status`, { status: newStatus });
            // Odmah osvježi listu lokalno
            setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
        } catch (err) {
            alert("Greška pri ažuriranju.");
        }
    };

    if (loading) return <div className="loader">Učitavanje...</div>;

    // Filtriranje podataka
    const mojiPrimljeniAktivni = bookings.filter(b => b.tutor_id === user.id && b.status === 'pending');
    const mojiPoslaniAktivni = bookings.filter(b => b.student_id === user.id && b.status === 'pending');
    const arhiva = bookings.filter(b => b.status !== 'pending');

    return (
        <div className="dash-container">
            <header className="dash-header">
                <h1>{user.role === 'tutor' ? 'Tutor Dashboard' : 'Moji Zahtjevi'}</h1>
                <p>Prijavljeni ste kao: <strong>{user.full_name || user.email}</strong></p>
            </header>

            {/* SEKCIJA 1: AKTIVNI ZAHTJEVI (Za tutora) */}
            {user.role === 'tutor' && (
                <section className="dash-section">
                    <h2 className="section-title">📥 Novi upiti studenata</h2>
                    <div className="grid">
                        {mojiPrimljeniAktivni.length > 0 ? mojiPrimljeniAktivni.map(b => (
                            <div key={b.id} className="card pending-card">
                                <div className="card-body">
                                    <h3>Od: {b.student?.full_name}</h3>
                                    <p className="date">📅 {new Date(b.appointment_date).toLocaleDateString('bs-BA')}</p>
                                    <div className="msg-box">"{b.message}"</div>
                                </div>
                                <div className="card-footer">
                                    <button onClick={() => updateStatus(b.id, 'accepted')} className="btn-accept">Prihvati</button>
                                    <button onClick={() => updateStatus(b.id, 'rejected')} className="btn-reject">Odbij</button>
                                </div>
                            </div>
                        )) : <p className="empty-text">Nema novih upita na čekanju.</p>}
                    </div>
                </section>
            )}

            {/* SEKCIJA 2: MOJI POSLANI ZAHTJEVI (Za studente) */}
            {user.role === 'student' && (
                <section className="dash-section">
                    <h2 className="section-title">📤 Zahtjevi koje sam poslao</h2>
                    <div className="grid">
                        {mojiPoslaniAktivni.length > 0 ? mojiPoslaniAktivni.map(b => (
                            <div key={b.id} className="card sent-card">
                                <div className="card-body">
                                    <h3>Tutor: {b.tutor?.full_name}</h3>
                                    <p className="date">📅 Termin: {new Date(b.appointment_date).toLocaleDateString('bs-BA')}</p>
                                    <p className="status-label">Status: <span>{b.status}</span></p>
                                </div>
                            </div>
                        )) : <p className="empty-text">Trenutno nemate aktivnih zahtjeva.</p>}
                    </div>
                </section>
            )}

            {/* SEKCIJA 3: ARHIVA (Za sve) */}
            <section className="dash-section">
                <h2 className="section-title archive-title">📂 Arhiva (Završeno)</h2>
                <div className="grid archive-grid">
                    {arhiva.map(b => (
                        <div key={b.id} className={`card mini-card ${b.status}`}>
                            <div className="card-body">
                                <strong>{b.student_id === user.id ? `Tutor: ${b.tutor?.full_name}` : `Student: ${b.student?.full_name}`}</strong>
                                <span className={`status-badge ${b.status}`}>{b.status === 'accepted' ? 'Odobreno' : 'Odbijeno'}</span>
                                <p className="small-date">{new Date(b.appointment_date).toLocaleDateString('bs-BA')}</p>
                            </div>
                        </div>
                    ))}
                    {arhiva.length === 0 && <p className="empty-text">Arhiva je prazna.</p>}
                </div>
            </section>
        </div>
    );
}

export default Dashboard;