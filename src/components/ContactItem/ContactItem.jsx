import css from './ContactItem.module.css';
import PropTypes from 'prop-types';

const ContactItem = ({ id, name, number, onDelContact }) => (
<li key={id} className={css.contacts__item}>
    <p>
        {name}:&nbsp; 
        <span>
        {number}
        </span>
    </p>
    <button
        className={css.contacts__btn}
        type="button"
        onClick={() => onDelContact(id)}
    >
        Delete
    </button>
</li>
);

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelContact: PropTypes.func.isRequired,
};

export default ContactItem;