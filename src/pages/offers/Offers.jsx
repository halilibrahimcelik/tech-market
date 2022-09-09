import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../helpers/firebase.config";
import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import styles from "./Offers.module.scss";
import Listings from "../../components/listings/Listings";
const Offers = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchListing] = useState(null);
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
          limit(2)
        );

        //Execute query
        const querySnap = await getDocs(newQuery);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];

        setLastFetchListing(lastVisible);

        let listingArray = [];
        querySnap.forEach((doc) => {
          return listingArray.push({
            id: doc.id, //id doc.data() içinde yok manuel olarak ekliyoru<
            ...doc.data(),
          });
        });

        setListings(listingArray);

        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);
  const fetchMoreListing = async () => {
    try {
      //?getting reference
      const listingsRef = collection(db, "listings");
      //?getting query
      const newQuery = query(
        listingsRef,
        where("offer", "==", true),
        orderBy("timeStamp", "desc"),
        startAfter(lastFetchedListing),
        limit(5)
      );

      //Execute query
      const querySnap = await getDocs(newQuery);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];

      setLastFetchListing(lastVisible);
      console.log(lastFetchedListing);
      let listingArray = [];
      querySnap.forEach((doc) => {
        console.log(doc.data());
        return listingArray.push({
          id: doc.id, //id is not located in  doc.data() we manually add this
          ...doc.data(),
        });
      });

      setListings((prevState) => [...prevState, ...listingArray]);

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
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

      {lastFetchedListing && (
        <button className={styles["load-button"]} onClick={fetchMoreListing}>
          Load More
        </button>
      )}
    </section>
  );
};

export default Offers;
