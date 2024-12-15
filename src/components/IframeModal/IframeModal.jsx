import React from 'react';
import './IframeModal.css';

const IframeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => {
      // Close modal when clicking overlay (outside modal)
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <iframe
          src="https://denser.ai/u/embed/3e832566-c648-417d-8ae1-ab397473ae2e"
          frameBorder="0"
          title="Denser AI"
        />
      </div>
    </div>
  );
};

export default IframeModal; 