import React from 'react';
import ReactDOM from 'react-dom';
import { DEFAULT_AVATAR } from '../../utils/constants';

const ContactModal = ({ contact, isOpen, onClose }) => {
  if (!isOpen || !contact) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="modal-header">
          <img src={contact.photo || DEFAULT_AVATAR} alt={contact.name} className="modal-photo" />
          <div>
            <h2>{contact.name} {contact.lastname}</h2>
            <p className="modal-small">{contact.nickname || 'Sin apodo'}</p>
          </div>
        </div>
        <div className="modal-body">
          <p><strong>Teléfono:</strong> {contact.phone}</p>
          <p><strong>Notas:</strong></p>
          <p className="modal-notes">{contact.notes || 'Sin notas agregadas'}</p>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') || document.body
  );
};

export default ContactModal;
