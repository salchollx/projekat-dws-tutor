import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TutorCard.css';


export function TutorCard({ tutor }) {
  const navigate = useNavigate();

  // Ako tutor iz nekog razloga ne dođe, ne rendaj ništa
  if (!tutor) return null;

  const handleCardClick = () => {
    // Navigacija na profil tutora koristeći njegov UUID iz baze
    // Koristimo user_id jer on povezuje tabele profiles i tutors
    navigate(`/tutor/${tutor.user_id}`);
  };

  // Uzimamo puno ime iz spojenog profiles objekta
  const fullName = tutor.profiles?.full_name || "Nepoznat Tutor";
  
  // URL slike (ako nema slike u bazi, koristi placeholder)
  const imageUrl = tutor.profiles?.avatar_url || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    // ... unutar return-a TutorCard komponente
<div className="tutor-card" onClick={handleCardClick}>
  <div className="tutor-image-container">
    <img src={imageUrl} alt={fullName} className="tutor-card-img" />
    <span className="tutor-rating">★ {tutor.rating || '5.0'}</span>
  </div>
  
  <div className="tutor-content">
    <div className="tutor-header-main">
      <h3>{fullName}</h3>
      <p className="tutor-subject-badge">{tutor.subject}</p>
    </div>
    
    <p className="tutor-description-text">
      {tutor.description}
    </p>

    <div className="tutor-card-footer">
      <div className="tutor-price-tag">
        <span className="price-amount">{tutor.price || 0} KM</span>
        <span className="price-unit">/h</span>
      </div>
      <button className="view-profile-btn">Profil</button>
    </div>
  </div>
</div>
  );
}

export default TutorCard;