import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Searchbar from './components/Searchbar/Searchbar';

export default class App extends Component {
  state = {
    imageValue: [],
    openModal: false,
    isLoading: false,
    pixaBayImages: [],
  };
  maxImage = '';
  newElementHight = 0;

  handleFormSubmit = imageValue => {
    this.setState({ imageValue, page: 1, pixaBayImages: [] });
  };

  closeModal = () => {
    this.fullImageURL = '';
    this.setState({ openModal: false });
  };

  showImageFunc = imageUrl => () => {
    this.maxImage = imageUrl;
    this.setState({ openModal: true });
  };
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          imageValue={this.state.imageValue}
          showImageFunc={this.showImageFunc}
        ></ImageGallery>
        {this.state.openModal && (
          <Modal maxImage={this.maxImage} onClose={this.closeModal}></Modal>
        )}

        <ToastContainer />
      </div>
    );
  }
}
