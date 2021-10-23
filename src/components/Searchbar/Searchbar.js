import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  state = {
    imageValue: '',
  };

  handleValueChange = e => {
    this.setState({ imageValue: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.imageValue.trim() === '') {
      return toast('Enter value');
    }
    this.props.onSubmit(this.state.imageValue);
    this.setState({
      imageValue: '',
    });
  };

  render() {
    return (
      <div>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.handleSubmit}>
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
            </button>

            <input
              onChange={this.handleValueChange}
              value={this.state.imageValue}
              className="SearchForm-input"
              type="text"
              // autocomplete="off"
              // autofocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </div>
    );
  }
}
export default Searchbar;
