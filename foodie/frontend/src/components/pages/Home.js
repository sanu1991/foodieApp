import React, { useContext, useEffect, useState } from "react";
// import { Navigate } from 'react-router';
import eduLogo from "../images/NewFolder/eduLogo.png";
import { Link, useNavigate } from "react-router-dom";
// import { Link, useHistory } from "react-router-dom";
import Navbar from "../subComponents/Navbar";
import { Context } from "../context/MainContext";

const Home = () => {
  const {
    input,
    handleChange,
    restaurantList,
    countryList,
    mealList,
    CuisineList,
    CostForTwoList,
    SortList,
    loginDetails,
    setLoginDetails,
    mealTypeDetails,
    setMealTypeDetails,

    // filteredData,
    // setFilteredData,
    selectLocation,
    setSelectLocation,
    selectCuisines,
    setSelectCuisines,
    selectCft,
    setSelectCft,
    selectSort,
    setSelectSort,
    selectRestaurant,
    setSelectRestaurant,

    filteredDataVisible,
    setFilteredDataVisible,
    selectMapFuncData,
    setSelectMapFuncData,

    modalShow,
    setModalShow,
    modalHandle,
    setModalHandle,
  } = useContext(Context);

  const mealType = (e) => {
    const mealDtls = mealList.find((ml) => ml.id == e);
    // console.log(mealDtls)
    setMealTypeDetails(mealDtls);
  };

  const srchlocation = (e) => {
    if (selectSort.length != 0) {
      setSelectLocation(
        selectSort.filter((ml) => ml.location == e.target.value)
      );
    } else {
      setSelectLocation(
        restaurantList.filter((ml) => ml.location == e.target.value)
      );
    }

    if (selectCft.length != 0) {
      if (selectCft[0] == 0) {
        setSelectMapFuncData([]);
      } else {
        setSelectMapFuncData(
          selectCft.filter((ml) => ml.location == e.target.value)
        );
      }
    } else {
      if (selectSort.length != 0) {
        setSelectMapFuncData(
          selectSort.filter((ml) => ml.location == e.target.value)
        );
      } else {
        setSelectMapFuncData(
          restaurantList.filter((ml) => ml.location == e.target.value)
        );
      }
    }
  };

  const Navigate = useNavigate(); // to navigate
  const srchRestaurant = (e) => {
    // console.log(e.target.value)
    // console.log(e.target.selectedIndex)
    const res = restaurantList.find((ml) => ml.resName == e.target.value);
    // console.log(res)
    setSelectRestaurant(res);
    Navigate(`/restaurentDetails/${e.target.selectedIndex}`); // to navigate
  };

  return (
    <>
      <div className="homepagemainpic">
        <Navbar />
        <div class="logo_search">
          <img src={eduLogo} alt="error" width="130px" height="130px" />
          <p>Find the best restaurants, cafes, and bars</p>
          <div className="srchBars">
            <div class="input-group location">
              <select
                class="form-select"
                id="inputGroupSelect01"
                onChange={(e) => {
                  // console.log(e)
                  // setFilteredDataVisible(true);
                  // srchlocation(e);
                  handleChange("location", e.target.value);
                }}
                value={input.location}
                // placeholder=
              >
                <option selected>Select Location</option>
                {countryList.map((itm, index) => (
                  // console.log(index)
                  <option option key={index} value={itm.capital}>
                    {itm.capital}
                  </option>
                ))}
              </select>
            </div>
            {/* <FaSearch className="srchicon" /> */}
            <div class="input-group restaurant">
              <select
                class="form-select"
                id="inputGroupSelect01"
                onChange={(e) => {
                  srchRestaurant(e);
                  handleChange("restaurant", e.target.value);
                }}
                value={input.restaurant}
              >
                <option selected>Search for restaurants</option>
                {restaurantList.map((itm) => (
                  <option key={itm.id} value={itm.value}>
                    {itm.resName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* meal list */}
      <section className="mainContainerMealList">
        <div class="heading">
          <h3>
            <b>Quick Searches</b>
          </h3>
          <h5>Discover restaurants by type of meal</h5>
          <br /> <br />
          <div class="row row-cols-1 row-cols-md-3 g-4 mealList">
            {mealList.map((itm) => (
              <Link
                to={`/meal`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <div
                  class="card mb-3 mealListCard"
                  key={itm.id}
                  onClick={(e) => mealType(itm.id)}
                >
                  <div class="row g-0">
                    <div className="col-md-6">
                      <img
                        src={itm.image}
                        class="img-fluid rounded-start"
                        alt="error"
                      />
                    </div>
                    <div className="col-md-6">
                      <div class="card-body">
                        <p class="card-title mealListCardTitle">
                          {itm.mealName}
                        </p>
                        <p class="card-text mealListCardText">
                          {itm.mealDetail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
