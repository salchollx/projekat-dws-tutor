import { useState, useEffect } from 'react';
import API from '../api';
import './AdminDashboard.css';

export function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await API.get('/admin/users');
            setUsers(res.data);
        } catch (err) {
            console.error("Greška pri dohvatanju korisnika");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Jeste li sigurni?")) {
            try {
                const res = await API.delete(`/admin/users/${id}`);

                if (res.data.success) {
                    // Filtriraj listu u state-u - ovo mijenja refresh!
                    setUsers(prev => prev.filter(u => u.id !== id));
                    // Opcionalno makni alert ako te nervira
                    console.log("Obrisano.");
                }
            } catch (err) {
                // Ako je korisnik ipak nestao (refresh situacija), samo ga makni iz tabele
                setUsers(prev => prev.filter(u => u.id !== id));
                console.log("Korisnik je već obrisan ili je došlo do greške.");
            }
        }
    };

    if (loading) return <div className="admin-loader">Učitavanje podataka...</div>;

    return (
        <div className="admin-wrapper">
            <header className="admin-header">
                <h1>Admin Panel</h1>
                <div className="stats-bar">
                    <div className="stat-item">Ukupno korisnika: <strong>{users.length}</strong></div>
                    <div className="stat-item">Tutora: <strong>{users.filter(u => u.role === 'tutor').length}</strong></div>
                </div>
            </header>

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Ime i prezime</th>
                            <th>Uloga</th>
                            <th>Email (ID)</th>
                            <th>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.full_name || 'Nema imena'}</td>
                                <td>
                                    <span className={`role-badge ${u.role}`}>{u.role}</span>
                                </td>
                                <td className="small-text">{u.id}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(u.id)}>
                                        Obriši trajno
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;