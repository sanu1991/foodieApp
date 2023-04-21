import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const { auth, setAuth, productDetails, addProductinput, setaddProductinput } =
    props;
  const Navigate = useNavigate(); // to navigate
  //   useEffect(() => {
  //     console.log(auth);
  //   }, [auth]);
  return (
    <>
      {auth === null ? (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    to={`/signup`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <h3 className="nav-link">Signup</h3>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={`/login`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <h3 className="nav-link">Login</h3>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to={`/`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <h3 className="nav-link">Products</h3>
                </Link>
              </li>
              {addProductinput.userId === null ? (
                <li className="nav-item">
                  <Link
                    to={`/addProducts`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <h3 className="nav-link">Add Products</h3>
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    to={`/updateProducts`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <h3 className="nav-link">Update Products</h3>
                  </Link>
                </li>
              )}
            </ul>
            <form className="d-flex">
              <Link
                to={`/signup`}
                onClick={() => {
                  setAuth(null);
                  localStorage.clear();
                  sessionStorage.clear();
                  Navigate("/signup");
                }}
                style={{ textDecoration: "none", color: "black" }}
              >
                {/* <h2 className="nav-link">Logout ({JSON.parse(auth).name})</h2> */}
                <h2 className="nav-link">Logout </h2>
              </Link>
            </form>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
