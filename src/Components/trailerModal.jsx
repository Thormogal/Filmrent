import React from 'react';
import '/src/CSS/trailerModal.css';

const TrailerModal = ({ isOpen, trailerKey, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="trailer-overlay" onClick={onClose}>
      <div className="trailer-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <iframe
          width="800"
          height="450"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&enablejsapi=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube Trailer"
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerModal;
