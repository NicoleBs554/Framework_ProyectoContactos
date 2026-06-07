import React from 'react';

const ContactCardV2 = ({ contact, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="contact-card contact-card-v2" onClick={() => onViewDetails(contact)}>
      <div className="card-header">
        <img src={contact.photo} alt={contact.name} />
        <h3>{contact.name} {contact.lastname}</h3>
      </div>
      <div className="card-body">
        <p><strong>📞 {contact.phone}</strong></p>
        {contact.nickname && <p><strong>🎭 Apodo:</strong> {contact.nickname}</p>}
        <p className="notes-preview">{contact.notes?.substring(0, 60)}...</p>
      </div>
      <div className="contact-actions" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onEdit(contact)}>Editar</button>
        <button onClick={() => onDelete(contact.id)}>Eliminar</button>
      </div>
    </div>
  );
};

export default ContactCardV2;