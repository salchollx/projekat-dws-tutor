import { useState, useEffect } from 'react';
import axios from 'axios';
import TutorCard from '../components/TutorCard';
import './SearchPage.css';

export function SearchPage() {
  const [tutors, setTutors] = useState([]); // Svi tutori iz baze
  const [filteredTutors, setFilteredTutors] = useState([]); // Ono što prikazujemo
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Svi predmeti');
  const [maxPrice, setMaxPrice] = useState(100);

  // 1. Dohvatanje podataka sa servera
  useEffect(() => {
    const getTutors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/tutors');
        setTutors(res.data);
        setFilteredTutors(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Greška pri dohvatanju tutora:", err);
        setLoading(false);
      }
    };
    getTutors();
  }, []);

  // 2. Logika filtriranja (pokreće se svaki put kad se promijeni neki filter)
  useEffect(() => {
    let result = tutors;

    // Filtriraj po imenu ili predmetu (tekstualna pretraga)
    if (searchTerm) {
      result = result.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtriraj po kategoriji predmeta
    if (selectedSubject !== 'Svi predmeti') {
      result = result.filter(t => t.subject.toLowerCase().includes(selectedSubject.toLowerCase()));
    }

    // Filtriraj po cijeni
    result = result.filter(t => t.price <= maxPrice);

    setFilteredTutors(result);
  }, [searchTerm, selectedSubject, maxPrice, tutors]);

  if (loading) return <div className="container">Učitavanje tutora...</div>;

  return (
    <div className="container search-page">
      {/* Sidebar sa filterima */}
      <aside className="filter-sidebar">
        <h3>Filteri</h3>
        
        <div className="filter-group">
          <label>Predmet</label>
          <select 
            className="auth-select" 
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option>Svi predmeti</option>
            <option>Programiranje</option>
            <option>Matematika</option>
            <option>Jezici</option>
            <option>Dizajn</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Maksimalna cijena: <span style={{color: 'var(--primary-color)'}}>{maxPrice} KM</span></label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            step="5"
            value={maxPrice}
            className="price-range" 
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <div className="range-labels"><span>0 KM</span><span>100 KM</span></div>
        </div>

        <button 
          className="btn" 
          style={{width: '100%', marginTop: '20px', background: '#eee'}}
          onClick={() => {
            setSearchTerm('');
            setSelectedSubject('Svi predmeti');
            setMaxPrice(100);
          }}
        >
          Resetuj filtere
        </button>
      </aside>

      {/* Main content */}
      <main className="search-main">
        <div className="search-header">
          <input 
            type="text" 
            placeholder="Pretraži tutore po imenu ili vještini..." 
            className="auth-input search-bar" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <p style={{marginTop: '10px', color: 'var(--text-muted)'}}>
            Pronađeno: {filteredTutors.length} tutora
          </p>
        </div>
        
        {filteredTutors.length > 0 ? (
          <div className="tutor-grid">
            {filteredTutors.map(tutor => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div style={{textAlign: 'center', padding: '50px'}}>
            <h2>Nema rezultata za vašu pretragu.</h2>
            <p>Pokušajte promijeniti filtere.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default SearchPage;