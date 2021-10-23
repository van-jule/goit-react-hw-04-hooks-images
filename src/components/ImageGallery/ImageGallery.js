import PropTypes from "prop-types";
import styles from "./ImageGallery.module.css";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

export default function ImageGallery({ images, onClick }) {
  return (
    <ul className={styles.gallery}>
      {images.map((image, index) => (
        <ImageGalleryItem
          key={image.id}
          src={image.webformatURL}
          alt={image.tags}
          index={index}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}

ImageGallery.prototype = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

ImageGallery.defaultProps = {
  images: [],
  onClick: () => {},
};
