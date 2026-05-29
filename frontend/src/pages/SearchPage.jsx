import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import TutorCard from '../components/TutorCard';
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
  const [selectedSubject, setSelectedSubject] = useState('Svi predmeti');
  const [selectedSubCategory, setSelectedSubCategory] = useState('Sve');
  
  const location = useLocation();

  // --- 1. HVATANJE POJMA SA HOME PAGE-A ---
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const subjectFromUrl = queryParams.get('subject');
    if (subjectFromUrl) {
      setSearchTerm(subjectFromUrl); // Ovo automatski aktivira tvoj filter ispod
    }
  }, [location.search]);

  // --- 2. DOHVATANJE SVIH TUTORA ---
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/tutors');
        setTutors(res.data);
        setFilteredTutors(res.data);
      } catch (err) {
        console.error("Greška pri pozivu servera:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  // Resetuj podkategoriju kad se promijeni glavna oblast
  useEffect(() => {
    setSelectedSubCategory('Sve');
  }, [selectedSubject]);

  // --- 3. LOGIKA FILTRIRANJA (Frontend) ---
  useEffect(() => {
    let result = [...tutors];

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(t => {
        const name = t.profiles?.full_name?.toLowerCase() || "";
        const subject = t.subject?.toLowerCase() || "";
        const desc = t.description?.toLowerCase() || "";
        return name.includes(search) || subject.includes(search) || desc.includes(search);
      });
    }

    if (selectedSubject !== 'Svi predmeti') {
      result = result.filter(t =>
        t.subject?.toLowerCase().includes(selectedSubject.toLowerCase())
      );
    }

    if (selectedSubCategory !== 'Sve') {
      const sub = selectedSubCategory.toLowerCase();
      result = result.filter(t =>
        t.subject?.toLowerCase().includes(sub) ||
        t.description?.toLowerCase().includes(sub)
      );
    }

    result = result.filter(t => t.price <= maxPrice);
    setFilteredTutors(result);
  }, [searchTerm, selectedSubject, selectedSubCategory, maxPrice, tutors]);

  if (loading) return <div className="loader-container">Učitavanje tutora...</div>;

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
          <label>Maksimalna cijena: <span className="price-tag">{maxPrice} KM</span></label>
          <input
            type="range" min="0" max="100" step="5"
            value={maxPrice}
            className="price-range"
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <button
          className="btn btn-reset"
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
          <p className="results-count">
            Pronađeno: <strong>{filteredTutors.length}</strong> tutora
          </p>
        </div>

        <div className="tutors-grid">
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
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