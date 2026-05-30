import React, { useState } from 'react';
import { useContacts } from '../contexts/ContactContext';
import Header from '../components/layout/Header';
import ContactForm from '../components/contacts/ContactForm';
import ContactModal from '../components/contacts/ContactModal';
import ContactCardV1 from '../components/contacts/ContactCardV1';
import ContactCardV2 from '../components/contacts/ContactCardV2';
import ContactCardV3 from '../components/contacts/ContactCardV3';
import ContactCardV4 from '../components/contacts/ContactCardV4';

const ContactsPage = () => {
  const { contacts, addContact, updateContact, deleteContact } = useContacts();
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [viewVersion, setViewVersion] = useState('V1');

  // Mapeo de versiones a componentes
  const contactComponents = {
    V1: ContactCardV1,
    V2: ContactCardV2,
    V3: ContactCardV3,
    V4: ContactCardV4,
  };

  const CurrentContactComponent = contactComponents[viewVersion];

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleSave = (contactData) => {
    if (editingContact) {
      updateContact(editingContact.id, contactData);
    } else {
      addContact(contactData);
    }
    setShowForm(false);
    setEditingContact(null);
  };

  return (
    <div className="contacts-page">
      <Header
        viewVersion={viewVersion}
        setViewVersion={setViewVersion}
        onNewContact={() => {
          setEditingContact(null);
          setShowForm(true);
        }}
      />

      <div className="contacts-grid">
        {contacts.map(contact => (
          <CurrentContactComponent
            key={contact.id}
            contact={contact}
            onEdit={handleEdit}
            onDelete={deleteContact}
            onViewDetails={setSelectedContact}
          />
        ))}
      </div>

      {showForm && (
        <ContactForm
          contact={editingContact}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingContact(null); }}
        />
      )}

      <ContactModal
        contact={selectedContact}
        isOpen={!!selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </div>
  );
};

export default ContactsPage;