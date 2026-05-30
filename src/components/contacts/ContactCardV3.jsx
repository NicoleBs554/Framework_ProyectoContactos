import React from 'react';

const ContactCardV3 = ({ contact, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="contact-card contact-card-v3" onClick={() => onViewDetails(contact)}>
      <div className="avatar-block">
        {contact.photo ? (
          <img src={contact.photo} alt={contact.name} />
        ) : (
          <div className="avatar-placeholder">
            {contact.name?.charAt(0)}{contact.lastname?.charAt(0)}
          </div>
        )}
      </div>
      <div className="info-block">
        <span className="name">{contact.name} {contact.lastname}</span>
        <span className="phone">{contact.phone}</span>
      </div>
      <div className="actions-block" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={() => onEdit(contact)}>✏️</button>
        <button type="button" onClick={() => onDelete(contact.id)}>🗑️</button>
      </div>
    </div>
  );
};

export default ContactCardV3;
