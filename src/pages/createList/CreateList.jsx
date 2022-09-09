import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../helpers/firebase.config";
import { v4 as uuidv4 } from "uuid";
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
    images: {},
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
    images,
    address,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
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

    if (images.length > 6) {
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
        geolaction.lat = data.results[0]?.geometry.location.lat ?? 0;
        geolaction.lng = data.results[0]?.geometry.location.lng ?? 0;
        location =
          data.status === "ZERO_RESULTS"
            ? undefined
            : data.results[0]?.formatted_address;
        if (location === undefined || location.includes("undefined")) {
          setLoading(false);
          toast.error("Please enter a correct address");
          return;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      geolaction.lat = latitude;
      geolaction.lng = longitude;
      location = address;
      console.log(geolaction, location);
    }

    //?wrote a function for each image <<storing images in Firebase>>

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, "images/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            // eslint-disable-next-line default-case
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error("images not uploaded");
      return;
    });

    const formDataUpdated = {
      ...formData,
      imageUrls,
      geolaction,
      timeStamp: serverTimestamp(),
    };
    //delete unnessary data from fromData
    delete formDataUpdated.images;
    delete formDataUpdated.address;
    location && (formDataUpdated.location = location);
    !formDataUpdated.offer && delete formDataUpdated.discountedPrice;

    //!added newly updated formDAta to Firestore
    const docRef = await addDoc(collection(db, "listings"), formDataUpdated);
    // console.log(imageUrls);
    setLoading(false);
    toast.success("Listing saved");
    navigate(`/category/${formDataUpdated.type}/${docRef.id}`);
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
        images: e.target.files,
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
