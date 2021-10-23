import React, { Component } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import styles from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    value: "",
  };
  handleChange = (event) => {
    this.setState({ value: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { value } = this.state;

    if (!value) {
      return toast.error("Введите Ваш запрос");
    }

    this.props.onSubmit(value.trim());
    this.setState({ value: "" });
  };

  render() {
    const { value } = this.state;

    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

Searchbar.defaultProps = {
  onSubmit: () => {},
};

export default Searchbar;
