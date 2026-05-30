import React from 'react';

const ContactCardV4 = ({ contact, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="contact-card contact-card-v4" onClick={() => onViewDetails(contact)}>
      <div className="card-inner">
        <div className="card-front">
          <img src={contact.photo} alt={contact.name} />
          <h4>{contact.name} {contact.lastname}</h4>
          <p>{contact.phone}</p>
        </div>
        <div className="card-back" onClick={(event) => event.stopPropagation()}>
          <button type="button" onClick={() => onEdit(contact)}>Editar</button>
          <button type="button" onClick={() => onDelete(contact.id)}>Eliminar</button>
          <button type="button" onClick={() => onViewDetails(contact)}>Ver más</button>
        </div>
      </div>
    </div>
  );
};

export default ContactCardV4;
