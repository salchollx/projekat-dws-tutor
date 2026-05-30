import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../api';
import './TutorProfile.css';
import { useAuth } from '../context/AuthContext';

export function TutorProfile() {
    // 1. SVI HOOKOVI MORAJU BITI NA SAMOM VRHU
    const { id } = useParams();
    const { user } = useAuth();

    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState({ date: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 2. USEEFFECT ZA DOHVATANJE PODATAKA
    useEffect(() => {
        const fetchTutor = async () => {
            try {
                setLoading(true);
                const res = await API.get(`/tutors/${id}`);
                setTutor(res.data);
            } catch (err) {
                console.error("Greška pri dohvatanju profila tutora:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTutor();
    }, [id]);

    // 3. FUNKCIJA ZA SLANJE UPITA
    const handleBooking = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("Morate biti ulogovani da pošaljete upit!");
            return;
        }

        try {
            setIsSubmitting(true);
            await API.post('/bookings', {
                tutor_id: tutor.user_id,
                student_id: user.id,
                appointment_date: bookingData.date,
                message: bookingData.message
            });

            alert("Upit uspješno poslan tutoru!");
            setBookingData({ date: '', message: '' });
        } catch (err) {
            console.error(err);
            alert("Greška pri slanju upita.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 4. USLOVNI RENDERI (TEK NAKON HOOKOVA)
    if (loading) {
        return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Učitavanje profila...</div>;
    }

    if (!tutor) {
        return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Tutor nije pronađen.</div>;
    }

    const fullName = tutor.profiles?.full_name || "Tutor";
    const firstName = fullName.split(' ')[0];

    return (
        <div className="container tutor-profile-page">
            <div className="profile-grid">

                <div className="profile-main">
                    <Link to="/search" className="back-link">← Nazad na pretragu</Link>

                    <div className="profile-header-info">
                        <img
                            src={tutor.profiles?.avatar_url || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            alt={fullName}
                            className="profile-img-large"
                        />
                        <div>
                            <h1>{fullName}</h1>
                            <p className="profile-subject-tag">{tutor.subject}</p>
                            <div className="profile-stats">
                                <span>⭐ {tutor.rating || '5.0'}</span>
                                <span>📍 Online / Uživo</span>
                            </div>
                        </div>
                    </div>

                    <div className="profile-section">
                        <h3>O meni</h3>
                        <p>{tutor.description || 'Tutor još uvijek nije dodao opis.'}</p>
                    </div>

                    {(tutor.experience || tutor.education) && (
                        <div className="profile-section">
                            <h3>Dodatne informacije</h3>
                            {tutor.experience && <p><strong>Iskustvo:</strong> {tutor.experience}</p>}
                            {tutor.education && <p><strong>Obrazovanje:</strong> {tutor.education}</p>}
                        </div>
                    )}
                </div>

                <aside className="booking-card">
                    <div className="booking-header">
                        <span className="price-big">{tutor.price || 0} KM</span>
                        <span className="unit">/ po satu</span>
                    </div>

                    <form className="auth-form booking-form" onSubmit={handleBooking}>
                        <div className="input-group">
                            <label className="input-label">Datum</label>
                            <input
                                type="date"
                                className="auth-input"
                                required
                                value={bookingData.date}
                                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Poruka za tutora</label>
                            <textarea
                                className="auth-input"
                                placeholder={`Zdravo ${firstName}, trebam pomoć oko...`}
                                rows="3"
                                required
                                value={bookingData.message}
                                onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Slanje..." : "Pošalji upit za termin"}
                        </button>
                    </form>
                    <p className="booking-note">Besplatno otkazivanje do 24h prije termina.</p>
                </aside>

            </div>
        </div>
    );
}

export default TutorProfile;