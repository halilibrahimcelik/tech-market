import { useContext, createContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

export const AuthContext = createContext({
  userInfo: "",
});

//?our custom hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(auth);
      }
    });
  }, [auth]);
  const contextValue = {
    userInfo: user,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
