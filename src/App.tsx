import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./screen/Login";
import { monitorAuthState } from "./firebase/handleFunction";
import Navigation from "./Navigation";
import UserContext from "./context/UserContext";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    monitorAuthState(async (user: any) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setUserDetails(null);
      }
    });
  }, []);

  if (!user) {
    return <Login />;
  } else
    return (
      <UserContext.Provider
        value={{ token, setToken, user, setUser, userDetails, setUserDetails }}
      >
        <Navigation />
      </UserContext.Provider>
    );
}

export default App;
