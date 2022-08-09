import React, { useEffect } from "react";
import { TabTitle } from "../../UI/atoms";

const Dashboard = () => {
  TabTitle("Dashboard");

  useEffect(() => {
    document.title = "Dashboard";
  });
  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
