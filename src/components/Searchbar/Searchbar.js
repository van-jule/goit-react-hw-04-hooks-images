import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!value) {
      toast.info('Введите запрос');
    }

    onSubmit(value.trim());
    setValue('');
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.searchFormInput}
          type="text"
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

Searchbar.defaultProps = {
  onSubmit: () => {},
};

export default Searchbar;
