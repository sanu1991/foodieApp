import React, { useEffect, useState, useContext } from "react";
import { Context } from "../context/MainContext";
import { Link } from "react-router-dom";
import eduLogo from "../images/NewFolder/eduLogo.png";
import { FaShoppingCart } from "react-icons/fa";
import { IconContext } from "react-icons";
import Logins from "./Logins";
import Cart from "./Cart";
// import { Context } from "../context/MainContext";

const Navbar = (props) => {
  const {
    restaurantList,
    mealList,
    CuisineList,
    CostForTwoList,
    SortList,
    loginDetails,
    setLoginDetails,
    mealTypeDetails,
    setMealTypeDetails,
    selectLocation,
    setSelectLocation,
    selectRestaurant,
    setSelectRestaurant,
    modalShow,
    setModalShow,
    modalHandle,
    setModalHandle,
    menuListVisibility,
    setMenuListVisibility,
    cartVisibility,
    setCartVisibility,
    checkoutVisibility, 
    setCheckoutVisibility,
    noOfItemAtcart,
    itemAtcart,
    setItemAtcart
  } = useContext(Context);

  const navSet = () => {
    return (
      <nav
        class={
          window.location.pathname == "/"
            ? "navbar navbar-light"
            : "navbar navbar-light bg-danger"
        }
      >
        {/* site logo */}
        <div class="container-fluid">
          {window.location.pathname == "/" ? (
            <a class="navbar-brand"></a>
          ) : (
            <Link to={`/`} style={{ textDecoration: "none", color: "white" }}>
              <img
                className="navLogo"
                src={eduLogo}
                alt="error"
                width="50px"
                height="50px"
              />
            </Link>
          )}

          {/* cart  */}
          <div
            class="btn border-danger"
            onClick={() => setCartVisibility(true)}
          >
            <IconContext.Provider value={{ color: "white" }}>
              <FaShoppingCart className="fs-4" />
            </IconContext.Provider>
            <span className="text-info fs-6">{noOfItemAtcart}</span>
          </div>
        </div>
      </nav>
    );
  };
  return (
  <>
  {navSet()}

  <Cart cartVisibility={cartVisibility} setCartVisibility={setCartVisibility} itemAtcart={itemAtcart} setItemAtcart={setItemAtcart} noOfItemAtcart={noOfItemAtcart} checkoutVisibility={checkoutVisibility} setCheckoutVisibility={setCheckoutVisibility} />
  </>
  );
};

export default Navbar;
