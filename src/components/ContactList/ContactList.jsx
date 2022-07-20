import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import ContactItem from 'components/ContactItem';

const ContactList = ({contacts, onDelContact}) => (
  <ul className={css.contacts}>
    {contacts.map(({ id, name, number }) => {
      
      return (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          onDelContact={onDelContact}
        />
      );

    })}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDelContact: PropTypes.func.isRequired,
}

export default ContactList;