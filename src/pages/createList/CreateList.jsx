import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import { useRef } from "react";
import styles from "./CreateList.module.scss";
import CreateListForm from "../../components/createListForm/CreateListForm";
import { toast } from "react-toastify";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.warning(
        "Your discounted price need to be lower than original price! "
      );
      return;
    }

    if (imageUrls.length > 6) {
      setLoading(false);
      toast.error("You can upload max 6 images");
      return;
    }

    let geolaction = {};
    let location;

    if (geolocationEnabled) {
      try {
        const API_KEY = process.env.REACT_APP_GEOCODING_API_KEY_PRODD;
        const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      geolaction.lat = latitude;
      geolaction.lng = longitude;
      location = address;
    }
    setLoading(false);
  };

  const onMutate = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    //files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        imageUrls: e.target.files,
      }));
    }

    //text//booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
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
        <CreateListForm
          handleSubmit={handleSubmit}
          onMutate={onMutate}
          formData={formData}
          geolocationEnabled={geolocationEnabled}
        />
      </main>
    </section>
  );
};

export default CreateList;
