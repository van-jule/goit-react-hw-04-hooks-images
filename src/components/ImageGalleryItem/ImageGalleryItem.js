import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ src, alt, index, onClick }) {
  return (
    <li className={styles.item} onClick={() => onClick(index)}>
      <img src={src} alt={alt} className={styles.image} />
    </li>
  );
}

ImageGalleryItem.prototype = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

ImageGalleryItem.defaultProps = {
  src: './',
  alt: 'image',
  index: 0,
  onClick: () => {},
};
