import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from '../imageGallery/Image.module.css';

function Searchbar(props) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = e => {
    const target = e.currentTarget.value;

    setImageName(target.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (imageName.trim() === '') {
      toast('Enter name of image, please!');
      return;
    }

    props.onFormSubmit(imageName.trim());

    setImageName('');
  };

  const {
    Searchbar,
    SearchForm,
    SearchFormButton,
    SearchFormButtonLabel,
    SearchFormInput,
  } = s;

  return (
    <header className={Searchbar}>
      <form className={SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={SearchFormButton}>
          <span className={SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={SearchFormInput}
          type="text"
          name="imageName"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
