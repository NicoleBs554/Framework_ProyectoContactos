import React from 'react';
import ReactDOM from 'react-dom';

const ContactModal = ({ contact, isOpen, onClose }) => {
  if (!isOpen || !contact) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <img src={contact.photo} alt={contact.name} className="modal-photo" />
          <h2>{contact.name} {contact.lastname}</h2>
        </div>
        <div className="modal-body">
          <p><strong>📞 Teléfono:</strong> {contact.phone}</p>
          {contact.nickname && <p><strong>🎭 Apodo:</strong> {contact.nickname}</p>}
          <p><strong>📝 Notas:</strong></p>
          <p className="modal-notes">{contact.notes}</p>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') || document.body
  );
};

export default ContactModal;