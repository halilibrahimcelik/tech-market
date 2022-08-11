import { useContext, createContext, useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useState } from "react";
import { updateDoc } from "firebase/firestore";
import { db } from "../helpers/firebase.config";
import { unstable_batchedUpdates } from "react-dom";

export const AuthContext = createContext({
  token: "",
  auth: "",
  setToken: () => {},
  // logOut: () => {},
});

//?our custom hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const auth = getAuth();
  const [authInfo, setAuthInfo] = useState(null);
  const [token, setToken] = useState(auth.lastNotifiedUid);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unstable_batchedUpdates(() => {
        setAuthInfo(auth);
      });
      console.log("auth state changed!");
      console.log(auth);
      return () => {
        unsub();
      };
    });
  }, [auth]);

  const contextValue = {
    auth: authInfo,
    token: token,
    setToken: setToken,
    // logOut: signOut(),
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
