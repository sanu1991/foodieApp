import React, { useEffect, useState, useContext } from "react";
import { Context } from "../context/MainContext";
import MenuList from "../subComponents/MenuList";
import Navbar from "../subComponents/Navbar";

const RestaurentDetails = (props) => {
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
    noOfItemAtcart,
    setNoOfItemAtcart,
    itemAtcart,
    setItemAtcart,
    cartVisibility,
    setCartVisibility,
  } = useContext(Context);

  const [overviewAndContactBtnHandler, setOverviewAndContactBtnHandler] =
    useState(0);

  // useEffect(() => {
  //   console.log(selectRestaurant);
  // }, [selectRestaurant]);

  return (
    <>
      <Navbar />
      <div className="mainContainerRestaurentDetails">
        <div>
          {/* <img src={selectRestaurant.image} class="img-fluid" alt="error" /> */}
          <h3 style={{ padding: "30px 0px" }}>
            <b>{selectRestaurant.resName}</b>
          </h3>
          <button
            style={
              overviewAndContactBtnHandler === 0
                ? { borderBottom: "2px solid red" }
                : null
            }
            className="overviewAndContactBtn"
            onClick={() => setOverviewAndContactBtnHandler(0)}
          >
            <h5>
              <b>Overview</b>
            </h5>
          </button>
          <button
            style={
              overviewAndContactBtnHandler === 1
                ? { borderBottom: "2px solid red" }
                : null
            }
            className="overviewAndContactBtn"
            onClick={() => setOverviewAndContactBtnHandler(1)}
          >
            <h5>
              <b>Contact</b>
            </h5>
          </button>
          <button
            type="button"
            class="btn btn-danger onlineOrderBtn"
            onClick={() => setMenuListVisibility(true)}
          >
            Menu
          </button>

          {/* import menu list  */}
          <MenuList
            setCartVisibility={setCartVisibility}
            noOfItemAtcart={noOfItemAtcart}
            setNoOfItemAtcart={setNoOfItemAtcart}
            itemAtcart={itemAtcart}
            setItemAtcart={setItemAtcart}
            menuListVisibility={menuListVisibility}
            setMenuListVisibility={setMenuListVisibility}
            selectRestaurant={selectRestaurant}
          />

          {overviewAndContactBtnHandler === 0 ? (
            <div>
              <h4 style={{ padding: "30px 10px" }}>
                <b>About this place</b>
              </h4>
              <h5 style={{ padding: "5px 10px" }}>
                <b>Cuisine</b>
              </h5>
              <h5 style={{ padding: "5px 10px" }}>
                {selectRestaurant.cuisines.map((e, index) => (
                  <span key={index}>{e.label}, </span>
                ))}
              </h5>
              <h5 style={{ padding: "10px 10px" }}>
                <b>Average Cost</b>
              </h5>
              <h5 style={{ padding: "5px 10px" }}>
                ₹{selectRestaurant.costForTwo} for two people (approx.)
              </h5>
            </div>
          ) : overviewAndContactBtnHandler === 1 ? (
            <div>
              <h5 style={{ padding: "30px 10px 0px" }}>Phone Number</h5>
              <h5 style={{ color: "red", padding: "5px 10px" }}>
                + 91 {selectRestaurant.PhNo}
              </h5>
              <h5 style={{ padding: "30px 10px 0px" }}>
                <b>{selectRestaurant.resName}</b>
              </h5>
              <h5 style={{ padding: "5px 10px" }}>
                {selectRestaurant.location}
              </h5>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default RestaurentDetails;
