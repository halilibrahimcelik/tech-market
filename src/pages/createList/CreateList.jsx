import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import { useRef } from "react";
import styles from "./CreateList.module.scss";
import CreateListForm from "../../components/createListForm/CreateListForm";
const CreateList = () => {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "laptop",
    name: "",
    ramMemory: "",
    brand: "",
    imageUrls: {},
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    screenSize: "",
    operatingSystem: "",
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    name,
    ramMemory,
    brand,
    imageUrls,
    address,
    regularPrice,
    discountedPrice,
    operatingSystem,
    latitude,
    longitude,
    offer,
    screenSize,
  } = formData;
  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className={styles.container}>
      <header>
        <p>Create Your List!</p>
      </header>
      <main>
        <CreateListForm handleSubmit={handleSubmit} />
      </main>
    </section>
  );
};

export default CreateList;
