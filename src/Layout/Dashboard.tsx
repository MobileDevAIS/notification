import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import React from "react";
import { ToastContainer } from "react-toastify";

const DashboardLayout = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
