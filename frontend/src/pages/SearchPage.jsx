import { useState, useEffect } from 'react';
import axios from 'axios';
import {TutorCard} from '../components/TutorCard';
import './SearchPage.css';

const SUBJECT_CATEGORIES = {
  'Svi predmeti': [],
  'Programiranje': ['React', 'Node.js', 'Python', 'JavaScript', 'C++', 'Java'],
  'Matematika': ['Linearna algebra', 'Matematika 1', 'Matematika 2', 'Statistika', 'Diskretna matematika'],
  'Jezici': ['Engleski', 'Njemački', 'Francuski', 'Španski'],
  'Dizajn': ['UI/UX', 'Photoshop', 'Illustrator', 'Figma']
};

export function SearchPage() {
  const [tutors, setTutors] = useState([]); 
  const [filteredTutors, setFilteredTutors] = useState([]); 
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(100);

  // Unutar SearchPage komponente
const [selectedSubject, setSelectedSubject] = useState('Svi predmeti');
const [selectedSubCategory, setSelectedSubCategory] = useState('Sve'); // NOVO

// Resetuj podkategoriju svaki put kad se promijeni glavni predmet
useEffect(() => {
  setSelectedSubCategory('Sve');
}, [selectedSubject]);

// 2. Logika filtriranja
useEffect(() => {
  let result = [...tutors];

  // Filter 1: Tekstualna pretraga (Ime ili bilo šta u opisu/predmetu)
  if (searchTerm) {
    result = result.filter(t => {
      const name = t.profiles?.full_name?.toLowerCase() || "";
      const subject = t.subject?.toLowerCase() || "";
      const desc = t.description?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();
      return name.includes(search) || subject.includes(search) || desc.includes(search);
    });
  }

  // Filter 2: Glavni predmet
  if (selectedSubject !== 'Svi predmeti') {
    result = result.filter(t => 
      t.subject?.toLowerCase().includes(selectedSubject.toLowerCase())
    );
  }

  // Filter 3: Podkategorija (Gledamo da li se podkategorija nalazi u opisu ili nazivu predmeta)
  if (selectedSubCategory !== 'Sve') {
    result = result.filter(t => {
      const sub = selectedSubCategory.toLowerCase();
      return (
        t.subject?.toLowerCase().includes(sub) || 
        t.description?.toLowerCase().includes(sub)
      );
    });
  }

  // Filter 4: Cijena
  result = result.filter(t => t.price <= maxPrice);

  setFilteredTutors(result);
}, [searchTerm, selectedSubject, selectedSubCategory, maxPrice, tutors]);
  // 1. Dohvatanje podataka sa servera
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        console.log("Pozivam backend...");
        const res = await axios.get('http://localhost:5000/api/tutors');
        console.log("Podaci sa bekenda:", res.data);
        
        setTutors(res.data);
        setFilteredTutors(res.data); // Inicijalno prikaži sve
      } catch (err) {
        console.error("Greška pri pozivu servera:", err);
      } finally {
        setLoading(false); // OVO JE FALILO - prekida loading ekran
      }
    };
    fetchTutors();
  }, []);

  // 2. Logika filtriranja
  useEffect(() => {
    let result = [...tutors];

    // Filtriraj po imenu (iz profiles) ili predmetu
    if (searchTerm) {
      result = result.filter(t => {
        const name = t.profiles?.full_name?.toLowerCase() || "";
        const subject = t.subject?.toLowerCase() || "";
        const search = searchTerm.toLowerCase();
        return name.includes(search) || subject.includes(search);
      });
    }

    // Filtriraj po kategoriji predmeta
    if (selectedSubject !== 'Svi predmeti') {
      result = result.filter(t => 
        t.subject?.toLowerCase().includes(selectedSubject.toLowerCase())
      );
    }

    // Filtriraj po cijeni
    result = result.filter(t => t.price <= maxPrice);

    setFilteredTutors(result);
  }, [searchTerm, selectedSubject, maxPrice, tutors]);

  if (loading) return <div className="container" style={{padding: '50px', textAlign: 'center'}}>Učitavanje tutora...</div>;

  return (
    <div className="container search-page">
      <aside className="filter-sidebar">
        <h3>Filteri</h3>
        
        <div className="filter-group">
  <label>Glavna oblast</label>
  <select 
    className="auth-select" 
    value={selectedSubject}
    onChange={(e) => setSelectedSubject(e.target.value)}
  >
    {Object.keys(SUBJECT_CATEGORIES).map(cat => (
      <option key={cat} value={cat}>{cat}</option>
    ))}
  </select>
</div>

{/* DINAMIČKI FILTER ZA PODKATEGORIJE */}
{selectedSubject !== 'Svi predmeti' && SUBJECT_CATEGORIES[selectedSubject].length > 0 && (
  <div className="filter-group animate-fade-in">
    <label>Specifična oblast / Modul</label>
    <select 
      className="auth-select sub-category-select" 
      value={selectedSubCategory}
      onChange={(e) => setSelectedSubCategory(e.target.value)}
    >
      <option value="Sve">Sve iz oblasti {selectedSubject}</option>
      {SUBJECT_CATEGORIES[selectedSubject].map(sub => (
        <option key={sub} value={sub}>{sub}</option>
      ))}
    </select>
  </div>
)}

        <div className="filter-group">
          <label>Maksimalna cijena: <span style={{color: 'var(--primary-color)'}}>{maxPrice} KM</span></label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            step="5"
            value={maxPrice}
            className="price-range" 
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
          <div className="range-labels"><span>0 KM</span><span>100 KM</span></div>
        </div>

        <button 
          className="btn" 
          style={{width: '100%', marginTop: '20px', background: '#eee', color: '#333'}}
          onClick={() => {
            setSearchTerm('');
            setSelectedSubject('Svi predmeti');
            setMaxPrice(100);
          }}
        >
          Resetuj filtere
        </button>
      </aside>

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
        
        <div className="tutors-grid">
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
              // Mapiramo filtrirane tutore, ne sve
              <TutorCard key={tutor.id} tutor={tutor} />
            ))
          ) : (
            <div className="no-results">
               <p>Nažalost, nema tutora koji odgovaraju vašoj pretrazi.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SearchPage;