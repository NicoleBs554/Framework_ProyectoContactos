import React from 'react';

const ContactCardV2 = ({ contact, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="contact-card contact-card-v2" onClick={() => onViewDetails(contact)}>
      <div className="card-header">
        <img src={contact.photo} alt={contact.name} />
        <div>
          <h3>{contact.name} {contact.lastname}</h3>
          <p>{contact.nickname || 'Sin apodo'}</p>
        </div>
      </div>
      <div className="card-body">
        <p><strong>Teléfono:</strong> {contact.phone}</p>
        <p className="notes-preview">{contact.notes ? `${contact.notes.substring(0, 60)}...` : 'Sin notas'}</p>
      </div>
      <div className="contact-actions" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={() => onEdit(contact)}>Editar</button>
        <button type="button" onClick={() => onDelete(contact.id)}>Eliminar</button>
      </div>
    </div>
  );
};

export default ContactCardV2;
