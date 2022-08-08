import React from "react";

import { useAuthContext } from "../../hook/userAuth";

const Profile = () => {
  const { userName } = useAuthContext();
  console.log(userName);

  return userName?.currentUser?.displayName ? (
    <h1>{userName?.currentUser?.displayName}</h1>
  ) : (
    <p>Please Loggin first!</p>
  );
};

export default Profile;
