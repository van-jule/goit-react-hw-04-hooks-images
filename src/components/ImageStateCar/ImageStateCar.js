import { useState, useEffect } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './ImageStateCar.module.css';
import ImageGallery from '../ImageGallery/ImageGallery';
import UserLoader from '../UserLoader/UserLoader';
import ImageApi from '../services/Pixabay';
import ImageError from './ImageError';
import Status from '../services/status';
import Button from '../Button';
import Modal from '../Modal';

const ImageStateCar = ({ queryValue, page: firstPage }) => {
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(firstPage);
  const [openModal, setOpenModal] = useState(false);
  const [openModalIndex, setOpenModalIndex] = useState(undefined);
  const [status, setStatus] = useState(Status.IDLE);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (queryValue) {
      console.log('queryValue', queryValue);
      setStatus(Status.PENDING);
      setScrollHeight(0);

      setTimeout(() => {
        ImageApi.fetchImages(queryValue, page)
          .then(({ images, totalHits }) => {
            setImages(images);

            const newStatus =
              images.length > 0 ? Status.RESOLVED : Status.REJECTED;
            setStatus(newStatus);
            setTotalHits(totalHits);
          })
          .catch(error => {
            setStatus(Status.REJECTED);
            setError(error);
          });
      }, 500);
    }
  }, [queryValue]);

  useEffect(() => {
    if (page > 1)
      window.scrollTo({
        top: scrollHeight,
        behavior: 'smooth',
      });
  }, [page]);

  const loadMore = () => {
    const currentScrollHeight = document.documentElement.scrollHeight - 150;

    ImageApi.fetchImages(queryValue, page + 1)
      .then(({ images: fetchImages }) => {
        setImages([...images, ...fetchImages]);
        setStatus(Status.RESOLVED);
        setScrollHeight(currentScrollHeight);
        setPage(page + 1);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  };

  const closeModal = () => setOpenModal(false);

  if (status === 'idle') {
    return <p className={styles.text}>Введите Ваш запрос</p>;
  }

  if (status === 'pending') {
    return <UserLoader />;
  }

  if (status === 'rejected') {
    return <ImageError />;
  }

  if (status === 'resolved') {
    return (
      <>
        <ImageGallery
          images={images}
          onClick={modalOpen => {
            setOpenModalIndex(modalOpen);
            setOpenModal(true);
          }}
        />
        {images.length > 0 && page !== Math.ceil(totalHits / 12) && (
          <Button onClick={loadMore} />
        )}

        {openModal && (
          <Modal closeModal={closeModal} image={images[openModalIndex]} />
        )}
      </>
    );
  }
};

export default ImageStateCar;
