import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import Spinner from "../../components/spinner/Spinner";
import styles from "./ListProduct.module.scss";
import { db } from "../../helpers/firebase.config";
import { FiShare2 } from "react-icons/fi";
import { useAuthContext } from "../../hook/userAuth";
import { toast } from "react-toastify";

const ListProduct = () => {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [linkCoppied, setLinkCoppied] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { auth } = useAuthContext();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      } else {
        toast.error("Could not fetch the data");
      }

      try {
        setLoading(false);
      } catch (error) {}
    };
    fetchListing();
  }, [params.listingId]);

  return <div>ListProduct</div>;
};

export default ListProduct;
