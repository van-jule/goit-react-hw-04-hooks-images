import { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./ImageStateCar.module.css";
import ImageGallery from "../ImageGallery/ImageGallery";
import UserLoader from "../UserLoader/UserLoader";
import ImageApi from "../services/pixabay";
import ImageError from "./ImageError";
import Status from "../services/status";
import Button from "../Button";
import Modal from "../Modal";

class ImageStateCar extends Component {
  state = {
    images: null,
    page: 1,
    openModal: false,
    openModalIndex: undefined,
    status: Status.IDLE,
    scrollHeight: 0,
    totalHits: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevProps.queryValue;
    const nextValue = this.props.queryValue;

    if (prevValue !== nextValue) {
      this.setState({ status: Status.PENDING, page: 1, scrollHeight: 0 });

      setTimeout(() => {
        ImageApi.fetchImages(nextValue)
          .then(({ images, totalHits }) => {
            this.setState({
              images,
              status: images.length > 0 ? Status.RESOLVED : Status.REJECTED,
              totalHits,
            });
          })
          .catch((error) => this.setState({ error, status: Status.REJECTED }));
      }, 500);
    }

    if (prevState.openModal === this.state.openModal) {
      window.scrollTo({
        top: this.state.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  loadMore = () => {
    const { page } = this.state;

    ImageApi.fetchImages(this.props.queryValue, page + 1)
      .then(({ images }) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          status: Status.RESOLVED,
          scrollHeight: document.documentElement.scrollHeight - 150,
          page: page + 1,
        }));
      })
      .catch((error) => this.setState({ error, status: Status.REJECTED }));
  };

  closeModal = (event) => {
    console.log(this.state.scrollHeight);
    if (event.currentTarget === event.target) {
      this.setState({
        openModal: false,
      });
    }
  };

  render() {
    const { images, status, openModal, openModalIndex, page, totalHits } =
      this.state;

    if (status === "idle") {
      return <p className={styles.text}>Введите Ваш запрос</p>;
    }

    if (status === "pending") {
      return <UserLoader />;
    }

    if (status === "rejected") {
      return <ImageError />;
    }

    if (status === "resolved") {
      return (
        <>
          <ImageGallery
            images={images}
            onClick={(modalOpen) => this.setState(modalOpen)}
          />
          {images.length > 0 && page !== Math.ceil(totalHits / 12) && (
            <Button onClick={this.loadMore} />
          )}

          {openModal && (
            <Modal
              closeModal={this.closeModal}
              image={images[openModalIndex]}
            />
          )}
        </>
      );
    }
  }
}

export default ImageStateCar;
