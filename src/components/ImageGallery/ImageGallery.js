import { Component } from 'react';
import { toast } from 'react-toastify';
import FuncLoader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';

export default class ImageGallery extends Component {
  state = {
    imageValue: [],
    error: null,
    status: 'idle',
    page: 1,
    perPage: 12,
    showModal: false,
    totalHits: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.imageValue !== prevProps.imageValue) {
      const KEY_API = '23070790-299ad5e8dfdc75cc527267990';
      const BASE_URL =
        'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

      this.setState({ status: 'pending', page: 1 });
      fetch(
        `${BASE_URL}&q=${this.props.imageValue}&page=${this.state.page}&per_page=12&key=${KEY_API}`,
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error(
              `по вашему запросу ${this.props.imageValue}ничего не найдено`,
            ),
          );
        })
        .then(imageValue => {
          if (imageValue.hits.length === 0) {
            return toast.error(
              `ничего не найдено по запросу ${this.props.imageValue}`,
            );
          } else
            this.setState({
              imageValue: imageValue.hits,
              status: 'resolved',
            });
        })

        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (
      prevState.imageValue.length !== this.state.imageValue.length &&
      prevState.imageValue.length !== 0
    ) {
      this.scrollForImages();
    }
    // if (
    //   prevProps.imageValue !== this.props.imageValue ||
    //   prevState.page !== this.state.page
    // )
  }
  handleClick = () => {
    this.setState(() => ({
      page: this.state.page + 1,
    }));

    fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${
        this.props.imageValue
      }&page=${
        this.state.page + 1
      }&per_page=12&key=23070790-299ad5e8dfdc75cc527267990`,
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(
            `по вашему запросу ${this.props.imageValue}ничего не найдено`,
          ),
        );
      })
      .then(imageValue => {
        if (imageValue.hits.length === 0) {
          return toast.error(
            `ничего не найдено по запросу ${this.props.imageValue}`,
          );
        } else
          this.setState(prev => ({
            imageValue: [...prev.imageValue, ...imageValue.hits],
            status: 'resolved',
          }));
      });
  };
  scrollForImages = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  render() {
    const { imageValue, status } = this.state;
    return (
      <div>
        {status === 'idle' && <div className="idleDiv">Enter name value</div>}
        <ul className="ImageGallery">
          {imageValue.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              src={webformatURL}
              alt={tags}
              className="ImageGalleryItem-image"
              showImageFunc={this.props.showImageFunc(largeImageURL)}
            />
          ))}
          {this.state.showModal && <Modal />}
        </ul>
        {status === 'rejected' && (
          <h1>такого имени нет {this.props.imageValue}</h1>
        )}
        {status === 'pending' ? (
          <FuncLoader />
        ) : (
          <Button onClick={this.handleClick} />
        )}
      </div>
    );
  }
}
