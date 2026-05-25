import TutorCard from '../components/TutorCard';
import './SearchPage.css';

export function SearchPage() {
  // Privremeni podaci (kasnije će ići useEffect i fetch)
  const tutors = [
    { id: 1, name: "Amar Selimović", subject: "Programiranje", rating: 4.9, price: 25, description: "Student 4. godine ETF-a...", image: "https://i.pravatar.cc/150?u=amar" },
    { id: 2, name: "Emina Hodžić", subject: "Matematika", rating: 4.8, price: 20, description: "Strpljivo objašnjavam...", image: "https://i.pravatar.cc/150?u=emina" },
    { id: 3, name: "Lejla Karić", subject: "Engleski jezik", rating: 5.0, price: 15, description: "Certificirani tutor sa 3 godine iskustva.", image: "https://i.pravatar.cc/150?u=lejla" },
  ];

  return (
    <div className="container search-page">
      {/* Sidebar sa filterima */}
      <aside className="filter-sidebar">
        <h3>Filteri</h3>
        <div className="filter-group">
          <label>Predmet</label>
          <select className="auth-select">
            <option>Svi predmeti</option>
            <option>Programiranje</option>
            <option>Matematika</option>
            <option>Jezici</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Cijena (maksimalna)</label>
          <input type="range" min="10" max="50" className="price-range" />
          <div className="range-labels"><span>10 KM</span><span>50 KM</span></div>
        </div>
        <button className="btn btn-primary" style={{width: '100%', marginTop: '20px'}}>Primijeni</button>
      </aside>

      {/* Main content - Search + Grid */}
      <main className="search-main">
        <div className="search-header">
          <input type="text" placeholder="Pretraži po imenu ili vještini..." className="auth-input search-bar" />
        </div>
        
        <div className="tutor-grid">
          {tutors.map(tutor => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default SearchPage;