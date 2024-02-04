import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminInvoices from "./AdminInvoices";
import UserInvoices from "./UserInvoices";
import jwt_decode from "jwt-decode";

const Bill = () => {
  const [userAuth, setUserAuth] = useState(null);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setUserAuth(decoded.UserInfo);
    }
  }, [token]);

  if (userAuth?.role === "Admin") {
    return <AdminInvoices />;
  }
  if (userAuth?.role === "Pedagang") {
    return <UserInvoices />;
  }
};

export default Bill;
