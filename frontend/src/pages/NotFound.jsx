import { Link } from 'react-router-dom';
import './NotFound.css';

export function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <div className="notfound-icon">🔍</div>
        <h2>Stranica nije pronađena</h2>
        <p>
          Izgleda da je stranica koju tražite premještena, obrisana 
          ili nikada nije ni postojala.
        </p>
        <Link to="/" className="btn btn-primary">
          Vrati se na početnu
        </Link>
      </div>
    </div>
  );
}

export default NotFound;