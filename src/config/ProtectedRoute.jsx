import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { userAuth } = useSelector((state) => state.auth);

  // show unauthorized screen if no user is found in redux store
  useEffect(() => {
    if (!userAuth) {
      return navigate("/auth");
    }
  }, [userAuth, navigate]);

  // returns child route elements
  return <Outlet />;
};
export default ProtectedRoute;
