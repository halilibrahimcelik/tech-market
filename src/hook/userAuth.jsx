import { useContext, createContext, useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useState } from "react";
import { updateDoc } from "firebase/firestore";
import { db } from "../helpers/firebase.config";

export const AuthContext = createContext({
  auth: "",
  // logOut: () => {},
});

//?our custom hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [authInfo, setAuthInfo] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthInfo(auth);
      }
    });
  }, [auth]);
  const contextValue = {
    auth: authInfo,
    // logOut: signOut(),
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
