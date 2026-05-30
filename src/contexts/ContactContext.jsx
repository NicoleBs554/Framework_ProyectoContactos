import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CONTACTS_STORAGE_KEY } from '../utils/constants';

const ContactContext = createContext();

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts debe usarse dentro de ContactProvider');
  }
  return context;
};

const STORAGE_KEY = CONTACTS_STORAGE_KEY;

const sampleContacts = [
  {
    id: uuidv4(),
    name: 'Juan',
    lastname: 'Pérez',
    phone: '123-456-7890',
    nickname: 'Juancito',
    notes: 'Amigo de la universidad con gusto por el fútbol.',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: uuidv4(),
    name: 'María',
    lastname: 'Gómez',
    phone: '098-765-4321',
    nickname: 'Mary',
    notes: 'Compañera de trabajo en el equipo de marketing.',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
];

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedContacts = localStorage.getItem(STORAGE_KEY);
    if (storedContacts) {
      try {
        setContacts(JSON.parse(storedContacts));
      } catch (error) {
        console.error('Error al parsear contactos desde localStorage:', error);
        setContacts(sampleContacts);
      }
    } else {
      setContacts(sampleContacts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleContacts));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts, loading]);

  const addContact = (contactData) => {
    const newContact = { ...contactData, id: uuidv4() };
    setContacts((prev) => [...prev, newContact]);
  };

  const updateContact = (id, updatedData) => {
    setContacts((prev) =>
      prev.map((contact) => (contact.id === id ? { ...updatedData, id } : contact))
    );
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const getContact = (id) => contacts.find((contact) => contact.id === id);

  return (
    <ContactContext.Provider
      value={{ contacts, loading, addContact, updateContact, deleteContact, getContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};
