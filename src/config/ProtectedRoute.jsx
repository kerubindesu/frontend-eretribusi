import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  const [userAuth, setUserAuth] = useState(null);

  console.log(userAuth);

  useEffect(() => {
    const auth = localStorage.getItem("userToken");
    if (auth) {
      setUserAuth(auth);
    }
  }, []);

  // show unauthorized screen if no user is found in redux store
  useEffect(() => {
    if (!userAuth) {
      return navigate("/");
    }
  }, [userAuth, navigate]);

  // returns child route elements
  return <Outlet />;
};
export default ProtectedRoute;
