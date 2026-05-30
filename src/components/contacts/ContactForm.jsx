import React, { useState, useEffect } from 'react';
import { DEFAULT_AVATAR } from '../../utils/constants';

const DEFAULT_PHOTO = DEFAULT_AVATAR;
const DEFAULT_FORM_STATE = {
  name: '',
  lastname: '',
  phone: '',
  nickname: '',
  notes: '',
  photo: DEFAULT_PHOTO,
};

const ContactForm = ({ contact, onSave, onClose }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        lastname: contact.lastname || '',
        phone: contact.phone || '',
        nickname: contact.nickname || '',
        notes: contact.notes || '',
        photo: contact.photo || DEFAULT_PHOTO,
      });
    } else {
      setFormData(DEFAULT_FORM_STATE);
      setFormError('');
    }
  }, [contact]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.lastname.trim() || !formData.phone.trim()) {
      setFormError('Nombre, apellido y teléfono son obligatorios.');
      return;
    }
    setFormError('');
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content form-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar formulario">
          ×
        </button>
        <h2>{contact ? 'Editar contacto' : 'Nuevo contacto'}</h2>
        {formError && (
          <div className="form-error" role="alert">
            {formError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            Nombre *
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              aria-required="true"
              autoFocus
            />
          </label>
          <label>
            Apellido *
            <input
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              aria-required="true"
            />
          </label>
          <label>
            Teléfono *
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              aria-required="true"
            />
          </label>
          <label>
            Apodo
            <input name="nickname" value={formData.nickname} onChange={handleChange} />
          </label>
          <label>
            URL de foto
            <input name="photo" value={formData.photo} onChange={handleChange} />
          </label>
          <label>
            Notas
            <textarea name="notes" value={formData.notes} onChange={handleChange} rows="4" />
          </label>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Guardar</button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
