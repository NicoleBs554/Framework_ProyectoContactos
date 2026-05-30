import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { DEFAULT_AVATAR } from '../../utils/constants';

const ContactModal = ({ contact, isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (modalRef.current) {
      modalRef.current.focus();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || !contact) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        tabIndex="-1"
        ref={modalRef}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar diálogo">
          ×
        </button>
        <div className="modal-header">
          <img src={contact.photo || DEFAULT_AVATAR} alt={contact.name} className="modal-photo" />
          <div>
            <h2 id="contact-modal-title">{contact.name} {contact.lastname}</h2>
            <p className="modal-small">{contact.nickname || 'Sin apodo'}</p>
          </div>
        </div>
        <div className="modal-body" aria-describedby="contact-modal-notes">
          <p><strong>Teléfono:</strong> {contact.phone}</p>
          <p><strong>Notas:</strong></p>
          <p id="contact-modal-notes" className="modal-notes">{contact.notes || 'Sin notas agregadas'}</p>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') || document.body
  );
};

export default ContactModal;
