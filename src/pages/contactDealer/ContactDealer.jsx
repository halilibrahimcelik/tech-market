import styles from "./ContactDealer.module.scss";
import { useState, useEffect, useRef } from "react";
import { db } from "../../helpers/firebase.config";
import { getDoc, doc } from "firebase/firestore";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MdMessage } from "react-icons/md";

const ContactDealer = () => {
  const [dealer, setDealer] = useState(null);

  const [message, setMessage] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  console.log(searchParams.get("listingName"));
  useEffect(() => {
    const getDealer = async () => {
      try {
        const docRef = doc(db, "users", params.dealerId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDealer(docSnap.data());
        } else {
          toast.error("Could not get dealer's information");
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getDealer();
  }, [params.dealerId]);
  console.log(message);

  return (
    <main className={styles.container}>
      <header>
        <h3>Contact the Dealer</h3>
      </header>

      <p>
        <strong>Contact Name</strong>: {dealer?.name}
      </p>

      <form className={styles.formArea}>
        <textarea
          className={styles["text-area"]}
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="offer your bid..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <a
          href={`mailto:${dealer?.email}?Subject=${searchParams.get(
            "listingName"
          )}&body=${message}`}
        >
          <button
            type="button"
            onClick={() =>
              setTimeout(() => {
                setMessage("");
              }, 1500)
            }
            className={styles["send-button"]}
          >
            <MdMessage />
            <p>Send a message</p>
          </button>
        </a>
      </form>
    </main>
  );
};

export default ContactDealer;
