import React from "react";
import { useAuthContext } from "../../hook/userAuth";
import { toast } from "react-toastify";
import CustomToastify from "../../components/toastify/CustomToastify";
const Explore = () => {
  const { auth, token } = useAuthContext();
  console.log(auth);

  if (auth?.currentUser) {
    toast(<CustomToastify />);
  }
  return (
    <div>
      <h1>Explore</h1>
    </div>
  );
};

export default Explore;
