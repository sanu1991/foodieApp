import React, { useContext, useEffect, useState } from "react";
import Navbar from "../subComponents/Navbar";
import { Link } from "react-router-dom";
import { Context } from "../context/MainContext";
import ReactPaginate from "react-paginate"; // for pagination

const MealType = () => {
  const {
    input,
    handleChange,
    restaurantList,
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

    modalShow,
    setModalShow,
    modalHandle,
    setModalHandle,
  } = useContext(Context);

  // const srchRestaurant1 = (e) => {
  //   // console.log(e)
  //   // console.log(e.target.value)
  //   // console.log(e.target.selectedIndex)
  //   const res = restaurantList.find((ml) => ml.id == e);
  //   // console.log(res);
  //   setSelectRestaurant(res);
  // };



  // location
  const srchlocation = (e) => {
    const loc = restaurantList.filter((ml) => ml.location == e.target.value);
    setSelectLocation(loc);
  };

  const uniqueList = [ // for location select box make unique
    ...new Set(
      restaurantList.map((curItem) => {
        return curItem.location;
      })
    ),
  ];



  // cuisines: for multi select checkbox: https://codesandbox.io/s/wild-silence-b8k2j?file=/src/App.js
  const [selectedCuisinesArray, setSelectedCuisinesArray] = useState([]);

  const cuisineMultiSelect = (indx, e) => {
    // input.cuisines = new Array(CuisineList.length).fill(false);
    const updatedCheckedState = input.cuisines.map((item, index) =>
      index === indx ? !item : item
    );
    handleChange("cuisines", updatedCheckedState);

    if (e.target.checked === true) {
      setSelectedCuisinesArray((value) => [...value, e.target.value]);
    } else {
      let fltrDltItm = selectedCuisinesArray.filter(
        (e1) => e1 != e.target.value
      );
      setSelectedCuisinesArray(fltrDltItm);
    }
  };

  useEffect(() => {
    const selectedCuisine = selectedCuisinesArray.map((e1) => {
      return restaurantList.filter((cuisines) => {
        return cuisines.cuisines.find((cui) => cui.name === e1) !== undefined
          ? true
          : false;
      });
    });
    if (selectedCuisine.length != 0) {
      setSelectCuisines([...new Set([].concat.apply([], selectedCuisine))]);
    } else {
      setSelectCuisines([]);
    }
  }, [selectedCuisinesArray]);


  // filter: cost for two //
  const filterCFTwise = (e) => {
    if (e.target.value == 1) {
      setSelectCft(restaurantList.filter((cost) => cost.costForTwo < 500));
    } else if (e.target.value == 2) {
      setSelectCft(restaurantList.filter((cost) => cost.costForTwo > 500 && cost.costForTwo < 1000));
    } else if (e.target.value == 3) {
      setSelectCft(restaurantList.filter((cost) => cost.costForTwo > 1000 && cost.costForTwo < 1500));
    } else if (e.target.value == 4) {
      setSelectCft(restaurantList.filter((cost) => cost.costForTwo > 1500 && cost.costForTwo < 2000));
    } else if (e.target.value == 5) {
      setSelectCft(restaurantList.filter((cost) => cost.costForTwo > 2000));
    }
  }


  // filter: sort //
  const filterSortwise = (e) => {
    if (e.target.value == 1) {
      setSelectSort(restaurantList.sort(function (a, b) { // sort data ascending order
        return (a.costForTwo - b.costForTwo);
      }));
    } else if (e.target.value == 2) {
      setSelectSort(restaurantList.sort(function (a, b) { // sort data descending order
        return (b.costForTwo - a.costForTwo);
      }));
    }
  }


  // useEffect(() => {
  //   let fltrDta = [selectLocation, selectCuisines, selectCft, selectSort];
  //   console.log(fltrDta);
  //   // setFilteredData();
  // }, [selectLocation, selectCuisines, selectCft, selectSort])




  // to select data for list of restaurant //
  let selectMapFuncData = "";
  if (selectLocation.length != 0) {
    selectMapFuncData = selectLocation;
  } else if (selectCuisines.length != 0) {
    selectMapFuncData = selectCuisines;
  } else if (selectCft.length != 0) {
    selectMapFuncData = selectCft;
  } else if (selectSort.length != 0) {
    selectMapFuncData = selectSort;
  } else {
    selectMapFuncData = restaurantList;
  }

  // for pagination
  const PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  const offset = currentPage * PER_PAGE;
  let pageCount = "";
  if (selectLocation != "") {
    pageCount = Math.ceil(selectLocation.length / PER_PAGE);
  }
  else if (selectCuisines.length != 0) {
    pageCount = Math.ceil(selectCuisines.length / PER_PAGE);
  } else if (selectCft != "") {
    pageCount = Math.ceil(selectCft.length / PER_PAGE);
  } else {
    pageCount = Math.ceil(restaurantList.length / PER_PAGE);
  }

  return (
    <>
      <Navbar />
      <div className="mainContainerMealType">
        <div>
          <h3 class="mealTypeHeading">
            {selectLocation != "" ? (
              <b>{`${mealTypeDetails.mealName} places in ${selectLocation[0].location}`}</b>
            ) : (
              <b>{`${mealTypeDetails.mealName}`}</b>
            )}
          </h3>
          <br />
          <div className="filterAndResDetlsList">
            {/* filter sidebar */}
            <div className="col-md-3 mealTypeFilterDiv">
              <h5 className="mealTypeFilter">
                <b>Filters</b>
              </h5>{" "}
              <br />
              <h6 className="mealSelectLocation">
                <b>Select Location</b>
              </h6>
              <select
                class="form-select"
                id="inputGroupSelect01"
                onChange={(e) => { srchlocation(e); handleChange("location", e.target.value) }}
                value={input.location}
              >
                <option selected>Select Location</option>
                {uniqueList.map((itm, index) => (
                  // console.log(index)
                  <option option key={index} value={itm}>
                    {" "}
                    {itm}
                  </option>
                ))}
              </select>{" "}
              <br />
              <h6 className="mealSelectLocation">
                <b>Cuisine</b>
              </h6>
              {CuisineList.map((itm, indx) => (
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value={itm.label}
                    // id="flexCheckDefault"
                    id={`custom-checkbox-${indx}`}
                    checked={input.cuisines[indx]}
                    onChange={(e) => {
                      cuisineMultiSelect(indx, e);
                    }}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    {itm.label}
                  </label>
                </div>
              ))}
              <br />
              <h6 className="mealSelectLocation">
                <b>Cost for Two</b>
              </h6>
              {CostForTwoList.map((itm, index) => (
                <div key={index} class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id={itm.value}
                    onChange={(e) => { handleChange("costForTwo", itm.value); filterCFTwise(e) }}
                    value={itm.value}
                    checked={input.costForTwo === itm.value}
                  />
                  <label class="form-check-label" for={itm.value}>
                    {itm.label}
                  </label>
                </div>
              ))}
              <br />
              <h6 className="mealSelectLocation">
                <b>Sort</b>
              </h6>
              {SortList.map((itm, index) => (
                <div key={index} class="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id={itm.value}
                    onChange={(e) => { handleChange("sort", itm.value); filterSortwise(e) }}
                    value={itm.value}
                    checked={input.sort === itm.value}
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    {itm.label}
                  </label>
                </div>
              ))}
              <br />
            </div>
            {/* restaurant List */}
            <div className="col-md-9 resDetlsList">
              {selectMapFuncData.slice(offset, offset + PER_PAGE).map((itm) => (
                <div
                  class="card mb-3 resDetlsListCard"
                  key={itm.id}
                // onClick={(e) => srchRestaurant1(itm.id)}
                >
                  <div class="row g-0">
                    <div className="col-md-3">
                      <Link
                        to={`/meal/restaurentDetails/${itm.id}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <img src={itm.image} class="img-fluid" alt="error" />
                      </Link>
                    </div>
                    <div className="col-md-9">
                      <Link
                        to={`/meal/restaurentDetails/${itm.id}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <h2 class="resDetlsListCardTitle">{itm.name}</h2>
                        <h6 class="resDetlsListCardRating">
                          <b>Rating: {itm.rating}</b>
                        </h6>
                        <h6 class="resDetlsListCardAddress">
                          {itm.place}, {itm.location}
                        </h6>
                      </Link>
                    </div>
                  </div>
                  <hr />
                  <div class="row g-0">
                    <div className="col-md-3">
                      <h6 class="resDetlsListCardCuisines">CUISINES:</h6>
                      <h6 class="resDetlsListCardCost">COST FOR TWO:</h6>
                    </div>
                    <div className="col-md-9">
                      <h6 class="resDetlsListCardCuisinesDetails">
                        {/* {itm.cuisines} */}
                        {itm.cuisines.map((e) => (
                          <span>| {e.name} | </span>
                        ))}
                      </h6>
                      <h6 class="resDetlsListCardCostDetails">
                        ₹ {itm.costForTwo}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* pagination */}
          <div>
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              previousLabel={"<<"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link text-danger"}
              nextLabel={">>"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link text-danger"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              activeClassName={"page-item active"}
              disabledClassName={"page-item disabled"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MealType;
