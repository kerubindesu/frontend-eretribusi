import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Bill = () => {
  const [user, setUser] = useState("");
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded.UserInfo);
    }
  }, [token]);

  if (user?.role === "Admin") {
    return <AdminDashboard />;
  }
  if (user?.role === "Pedagang") {
    return <UserDashboard />;
  }
};

export default Bill;
