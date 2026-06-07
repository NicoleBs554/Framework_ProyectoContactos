import React from 'react';

const ContactCardV1 = ({ contact, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="contact-card contact-card-v1" onClick={() => onViewDetails(contact)}>
      <img src={contact.photo} alt={contact.name} className="contact-photo" />
      <div className="contact-info">
        <h3>{contact.name} {contact.lastname}</h3>
        <p>{contact.phone}</p>
      </div>
      <div className="contact-actions" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onEdit(contact)}>✏️ Editar</button>
        <button onClick={() => onDelete(contact.id)}>🗑️ Eliminar</button>
      </div>
    </div>
  );
};

export default ContactCardV1;