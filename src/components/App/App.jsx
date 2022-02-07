import { useState, useEffect } from 'react';
import { Container, Title } from './App.styled';
import Filter from '../Filter';
import Form from '../Form';
import ContactList from '../ContactList';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? '';
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = contact => {
    contacts.some(
      contactItem =>
        contactItem.name.toLocaleLowerCase() ===
        contact.name.toLocaleLowerCase()
    )
      ? alert(`${contact.name} is already in contacts`)
      : setContacts(prevContacts => [...prevContacts, contact]);
    resetFilter();
  };

  const handleFilterName = e => {
    setFilter(e.target.value);
  };

  const filterContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  const handleDeleteContact = name => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== name.id)
    );
  };

  const resetFilter = () => setFilter('');

  return (
    <Container>
      <Title>Phonebook</Title>
      <Form onSubmit={handleSubmit} />
      <Title>Contacts</Title>
      <Filter value={filter} onChange={handleFilterName} />
      <ContactList
        contacts={filterContacts()}
        onDeleteContact={handleDeleteContact}
      />
    </Container>
  );
}
