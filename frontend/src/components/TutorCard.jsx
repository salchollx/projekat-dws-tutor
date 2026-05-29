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
    <div className="tutor-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="tutor-image">
        <img src={imageUrl} alt={fullName} />
        <span className="tutor-rating">★ {tutor.rating || '5.0'}</span>
      </div>
      
      <div className="tutor-info">
        <h3>{fullName}</h3>
        <p className="tutor-subject">{tutor.subject || "Opšti predmeti"}</p>
        
        {/* Skraćujemo opis ako je predugačak da ne kvari dizajn kartice */}
        <p className="tutor-desc">
          {tutor.description && tutor.description.length > 100 
            ? `${tutor.description.substring(0, 100)}...` 
            : tutor.description || "Nema opisa."}
        </p>

        <div className="tutor-footer">
          <span className="tutor-price">
            <strong>{tutor.price || 0} KM</strong>/h
          </span>
          <button className="btn btn-primary btn-sm">Pogledaj profil</button>
        </div>
      </div>
    </div>
  );
}

export default TutorCard;