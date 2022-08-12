import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../helpers/firebase.config";
import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import styles from "./Offers.module.scss";
import Listings from "../../components/listings/Listings";
const Offers = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        //?getting reference
        const listingsRef = collection(db, "listings");
        //?getting query
        const newQuery = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timeStamp", "desc"),
          limit(10)
        );

        //Execute query
        const querySnap = await getDocs(newQuery);
        let listingArray = [];
        querySnap.forEach((doc) => {
          console.log(doc.data());
          return listingArray.push({
            id: doc.id, //id doc.data() içinde yok manuel olarak ekliyoru<
            ...doc.data(),
          });
        });

        setListings(listingArray);
        console.log(listingArray);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <section className={styles.container}>
      <header>
        <p>Offers</p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <main>
          <ul>
            <Listings listings={listings} />
          </ul>
        </main>
      ) : (
        <p>There are no current offers</p>
      )}
    </section>
  );
};

export default Offers;
