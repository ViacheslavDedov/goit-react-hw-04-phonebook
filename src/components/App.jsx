import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from "./ContactList";
import css from './App.module.css';

const App = () => {
  const initialContact = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]
  
  const initialContacts = () => {
    return JSON.parse(localStorage.getItem('contacts')) || initialContact;
  }

  const [contacts, setContacts] = useState(initialContacts());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  }

  const newContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const delContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId),
    setFilter(''),
    );
  };

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

      if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
        return alert(`${contact.name} is already in contacts`);
      }

      if (contacts.some(contact => contact.number === number)) {
        return alert(`${contact.number} is already in contacts`);
      }

      setContacts([contact, ...contacts]);
  };

    return (
      <div className={css.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={addContact}
        />
        <h2>Contacts</h2>
        <Filter
          value={filter}
          onChange={changeFilter}
        />
        { contacts.length
            ? <ContactList
                contacts={newContacts()}
                onDelContact={delContact}
              />
            : <p className={css.phonebook__message}>Your phonebook is empty !!!</p>
        }
      </div>
    )
};

export default App;
