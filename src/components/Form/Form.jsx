import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactsForm, ContactsFormBtn, Input } from './Form.styled';
import PropTypes from 'prop-types';
import { HiOutlineUserAdd } from 'react-icons/hi';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handlerChangeName = e => {
    switch (e.target.name) {
      case 'name':
        return setName(e.target.value);
      case 'number':
        return setNumber(e.target.value);
      default:
        throw new Error();
    }
  };

  const handlerSubmitUser = e => {
    e.preventDefault();
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    onSubmit(contact);
    resetName();
  };

  const resetName = () => {
    setName('');
    setNumber('');
  };

  return (
    <ContactsForm onSubmit={handlerSubmitUser}>
      <label>
        Name *
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handlerChangeName}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label>
        Number *
        <Input
          type="tel"
          name="number"
          placeholder="+380*********"
          value={number}
          onChange={handlerChangeName}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <ContactsFormBtn type="submit">
        Add contact <HiOutlineUserAdd />{' '}
      </ContactsFormBtn>
    </ContactsForm>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
