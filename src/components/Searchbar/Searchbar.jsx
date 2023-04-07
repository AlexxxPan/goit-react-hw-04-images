import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';


export default function Searchbar ({ onSubmit }) {

  const [searchData, setSearchData] = useState('');

 const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchData);
  };

const handleChange = evt => {
    const { value } = evt.target;
    setSearchData(value);
  };
  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};