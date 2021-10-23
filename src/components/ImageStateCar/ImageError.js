import PropTypes from "prop-types";
import error from "./error.jpg";
import styles from "./ImageStateCar.module.css";

export default function ImageError({ message }) {
  return (
    <div role="alert" className={styles.wrap}>
      <img className={styles.image} src={error} width="300" alt="error" />
      <p className={styles.text}>{message}</p>
    </div>
  );
}

ImageError.propTypes = {
  message: PropTypes.string.isRequired,
};

ImageError.defaultProps = {
  message: "По Вашему запросу ничего не найдено",
};
