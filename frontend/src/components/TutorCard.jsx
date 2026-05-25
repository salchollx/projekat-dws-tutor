import './TutorCard.css';
import { useNavigate } from 'react-router-dom';

export function TutorCard({ tutor }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/tutor/${tutor.id}`);
  };

  return (
    <div className="tutor-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="tutor-image">
        <img src={tutor.image} alt={tutor.name} />
        <span className="tutor-rating">★ {tutor.rating}</span>
      </div>
      <div className="tutor-info">
        <h3>{tutor.name}</h3>
        <p className="tutor-subject">{tutor.subject}</p>
        <p className="tutor-desc">{tutor.description}</p>
        <div className="tutor-footer">
          <span className="tutor-price"><strong>{tutor.price} KM</strong>/h</span>
          {/* Dugme ostavljamo vizuelno, ali ono više ne mora imati zaseban onClick */}
          <span className="btn btn-primary btn-sm">Pogledaj profil</span>
        </div>
      </div>
    </div>
  );
}

export default TutorCard;