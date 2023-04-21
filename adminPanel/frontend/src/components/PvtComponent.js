import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";

const PvtComponent = () => {
  // const auth = localStorage.getItem('user');
  let auth = null;
  const localStorageAuth = localStorage.getItem("user");
  const sessionStorageAuth = sessionStorage.getItem("user");
  auth = localStorageAuth === null ? sessionStorageAuth : localStorageAuth;
  // console.log(auth);
  // const Navigate = useNavigate(); // to navigate
  return auth !== null ? <Outlet /> : <Navigate to="/signup" />;
};

export default PvtComponent;
