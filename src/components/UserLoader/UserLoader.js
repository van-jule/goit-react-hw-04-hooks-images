import React from "react";
import Loader from "react-loader-spinner";
import styles from "./UserLoader.module.css";

const UserLoader = () => {
  return (
    <div className={styles.LoaderWrap}>
      <Loader
        type="Puff"
        color="#3f51b5"
        height={200}
        width={200}
        timeout={3000}
      />
    </div>
  );
};

export default UserLoader;
