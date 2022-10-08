import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminBill from "./AdminBill";
import UserBill from "./UserBill";
import jwt_decode from "jwt-decode";

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
    return <AdminBill />;
  }
  if (user?.role === "Pedagang") {
    return <UserBill />;
  }
};

export default Bill;
