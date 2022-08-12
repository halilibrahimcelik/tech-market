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
});

//?our custom hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const auth = getAuth();
  const [authInfo, setAuthInfo] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        unstable_batchedUpdates(() => {
          setAuthInfo(auth);
        });
        const userInfo = {
          name: user.displayName,
          email: user.email,
        };
        console.log("auth state changed!");
        console.log(auth);
        localStorage.setItem("token", JSON.stringify(user.uid));
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
      return () => {
        unsub();
      };
    });
  }, [auth]);

  const contextValue = {
    auth: authInfo,
    token: token,
    setToken: setToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
