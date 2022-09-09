import { useContext, createContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

import { unstable_batchedUpdates } from "react-dom";

export const AuthContext = createContext({
  token: "",
  auth: "",
  setLoggedIn: () => {},
  loggedIn: "",
  checkingStatus: "",
});

//?our custom hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [authInfo, setAuthInfo] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthInfo(auth);
        setLoggedIn(true);

        const userInfo = {
          name: user.displayName,
          email: user.email,
        };
        // console.log("auth state changed!");
        // console.log(auth);
        localStorage.setItem("token", JSON.stringify(user.uid));
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
      setCheckingStatus(false);
      return () => {
        unsub();
      };
    });
  }, []);

  const contextValue = {
    auth: authInfo,
    loggedIn: loggedIn,
    checkingStatus: checkingStatus,
    setLoggedIn: setLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
