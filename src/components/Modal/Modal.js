import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ closeModal, image }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  const handleClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleClick}>
      <div className={styles.modal}>
        <img
          className={styles.image}
          src={image.largeImageURL}
          alt={image.tags}
        />
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.object,
};

Modal.defaultProps = {
  closeModal: () => {},
  image: null,
};

export default Modal;
