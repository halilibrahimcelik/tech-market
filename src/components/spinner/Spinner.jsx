import styles from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles["loading-spinner"]}></div>
    </div>
  );
};

export default Spinner;
