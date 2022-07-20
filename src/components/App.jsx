import React from "react";
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from "./ContactList";
import css from './App.module.css';



class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  }

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  changeFilter = e => {
    this.setState({filter: e.currentTarget.value});
  }

  newContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  delContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
      filter: '',
    }));
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => {
      if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
        return alert(`${contact.name} is already in contacts`);
      }

      if (contacts.some(contact => contact.number === number)) {
        return alert(`${contact.number} is already in contacts`);
      }

      return {contacts: [contact, ...contacts],};
    });
  };

  render () {
    const {contacts, filter} = this.state;
    const visibleContacts = this.newContacts();

    return (
      <div className={css.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.addContact}
        />
        <h2>Contacts</h2>
        <Filter
          value={filter}
          onChange={this.changeFilter}
        />
        { contacts.length
            ? <ContactList
                contacts={visibleContacts}
                onDelContact={this.delContact}
              />
            : <p className={css.phonebook__message}>Your phonebook is empty !!!</p>
        }
      </div>
    )
  }
};

export default App;
