import React, { useState, useEffect } from 'react';
import { DEFAULT_AVATAR } from '../../utils/constants';

const ContactForm = ({ contact, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    phone: '',
    nickname: '',
    notes: '',
    photo: DEFAULT_AVATAR,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        lastname: contact.lastname || '',
        phone: contact.phone || '',
        nickname: contact.nickname || '',
        notes: contact.notes || '',
        photo: contact.photo || DEFAULT_AVATAR,
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.lastname.trim() || !formData.phone.trim()) {
      setError('Nombre, apellido y teléfono son obligatorios');
      return;
    }
    setError('');
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content form-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{contact ? 'Editar Contacto' : 'Nuevo Contacto'}</h2>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            Nombre *
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Apellido *
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Teléfono *
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Apodo
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </label>
          <label>
            URL de la foto
            <input
              type="url"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="https://ejemplo.com/foto.jpg"
            />
          </label>
          <label>
            Notas
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
            />
          </label>
          <div className="form-actions">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;