import React, { useContext, useEffect, useState } from "react";
import Navbar from "../subComponents/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/MainContext";
import ReactPaginate from "react-paginate"; // for pagination

const MealType = () => {
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

    cuisinesDataQuery,
    setcuisinesDataQuery,

    setSelectRestaurant,

    selectSort,
    setSelectSort,

    filteredDataVisible,
    setFilteredDataVisible,
    selectMapFuncData,
    setSelectMapFuncData,

    modalShow,
    setModalShow,
    modalHandle,
    setModalHandle,
  } = useContext(Context);

  const Navigate = useNavigate(); // to navigate
  const srchRestaurant1 = (e) => {
    const res = restaurantList.find((ml) => ml._id === e);
    setSelectRestaurant(res);
    Navigate(`/restaurentDetails/${e}`); // to navigate
  };

  // =================== for all restaurant list ==================== //
  const resList = () => {
    return (
      <div className="col-md-9 resDetlsList">
        {restaurantList.slice(offset, offset + PER_PAGE).map((itm, index) => (
          <div
            class="card mb-3 resDetlsListCard"
            key={index}
            onClick={(e) => {
              srchRestaurant1(itm._id)
            }}
          >
            <div class="row g-0">
              <div className="col-md-3">
                  <img src={itm.image} class="img-fluid" alt="error" />
              </div>
              <div className="col-md-9">
                  <h2 class="resDetlsListCardTitle">{itm.resName}</h2>
                  <h6 class="resDetlsListCardRating">
                    <b>Rating: {itm.rating}</b>
                  </h6>
                  <h6 class="resDetlsListCardAddress">
                    {itm.location}, {itm.state}
                  </h6>
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
                  {itm.cuisines.map((e) => (
                    <span>| {e.label} | </span>
                  ))}
                </h6>
                <h6 class="resDetlsListCardCostDetails">₹ {itm.costForTwo}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ============== filtered restaurant list ================= //
  const fltrlist = () => {
    return (
      <div className="col-md-9 resDetlsList">
        {selectMapFuncData.slice(offset, offset + PER_PAGE).map((itm) => (
          <div class="card mb-3 resDetlsListCard" key={itm.id}>
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
                  {itm.cuisines.map((e) => (
                    <span>| {e.name} | </span>
                  ))}
                </h6>
                <h6 class="resDetlsListCardCostDetails">₹ {itm.costForTwo}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ========================= if filter vacant ======================== //
  const fltrVcnt = () => {
    return (
      <div className="col-md-9 resDetlsList">
        <div class="card nomtch">
          <h2>No Match</h2>
        </div>
      </div>
    );
  };

  // ======== to select data for list of restaurant ======== //
  const rstListVis = () => {
    // console.log(selectMapFuncData.length)
    if (filteredDataVisible === false) {
      return resList();
    } else {
      if (selectMapFuncData.length != 0) {
        return fltrlist();
      } else {
        return fltrVcnt();
      }
    }
  };

  const cuisineMultiSelect = (indx, e) => {
    // console.log(e)
    const updatedCheckedState = input.cuisines.map((item, index) =>
      index === indx ? !item : item
    );
    handleChange("cuisines", updatedCheckedState);

    // if (e.target.checked === true) {
    setcuisinesDataQuery({ label: e.target.value });
    // } else {
    //   let fltrDltItm1 = cuisinesDataQuery.filter(
    //     (e1) => e1.label !== e.target.value
    //   );
    //   setcuisinesDataQuery(fltrDltItm1);
    // }
  };

  // ================= for pagination ================ //
  const PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  const offset = currentPage * PER_PAGE;
  let pageCount = "";
  if (filteredDataVisible === false) {
    pageCount = Math.ceil(restaurantList.length / PER_PAGE);
  } else {
    if (selectMapFuncData.length != 0) {
      pageCount = Math.ceil(selectMapFuncData.length / PER_PAGE);
    } else {
      pageCount = "";
    }
  }

  // useEffect(() => {
  //   console.log(selectMapFuncData)
  // }, [selectMapFuncData])

  useEffect(() => {
    console.log(cuisinesDataQuery);
  }, [cuisinesDataQuery]);

  return (
    <>
      <Navbar />
      <div className="mainContainerMealType">
        <div>
          <h3 class="mealTypeHeading">
            {input.location !== "" ? (
              <b>{`${mealTypeDetails.mealName} places in ${input.location}`}</b>
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
              </h5>
              <br />
              {/* Location */}
              <div>
                <h6 className="mealSelectLocation">
                  <b>Select Location</b>
                </h6>
                <select
                  class="form-select"
                  id="inputGroupSelect01"
                  onChange={(e) => {
                    // console.log(e)
                    setFilteredDataVisible(true);
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
              <br />
              {/* Cuisine */}
              <div>
                <h6 className="mealSelectLocation">
                  <b>Cuisine</b>
                </h6>
                {CuisineList.map((itm, indx) => (
                  <div class="form-check" key={indx}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id={itm.value}
                      onChange={(e) => {
                        // console.log(e)
                        setFilteredDataVisible(true);
                        setcuisinesDataQuery({ label: itm.label });
                        handleChange("cuisines", itm.value);
                      }}
                      value={itm.value}
                      checked={input.cuisines === itm.value}
                    />
                    <label class="form-check-label" for="flexRadioDefault">
                      {itm.label}
                    </label>
                  </div>
                ))}
              </div>
              <br />
              {/* Cost for Two */}
              <div>
                <h6 className="mealSelectLocation">
                  <b>Cost for Two</b>
                </h6>
                {CostForTwoList.map((itm, index) => (
                  <div key={index} class="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault1"
                      id={itm.value}
                      onChange={(e) => {
                        setFilteredDataVisible(true);
                        // filterCFTwise(e);
                        handleChange("costForTwo", itm.value);
                      }}
                      value={itm.value}
                      checked={input.costForTwo === itm.value}
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      {itm.label}
                    </label>
                  </div>
                ))}
              </div>
              <br />
              {/* Sort */}
              <div>
                <h6 className="mealSelectLocation">
                  <b>Sort</b>
                </h6>
                {SortList.map((itm, index) => (
                  <div key={index} class="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault1"
                      id={itm.value}
                      onChange={(e) => {
                        setFilteredDataVisible(true);
                        // filterSortwise(e);
                        handleChange("sort", itm.value);
                      }}
                      value={itm.value}
                      checked={input.sort === itm.value}
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      {itm.label}
                    </label>
                  </div>
                ))}
              </div>
              <br />
            </div>
            {/* restaurant List */}
            {resList()}
            {/* {rstListVis()} */}
            {/* {fltrlist()} */}
          </div>
          {/* pagination */}
          <div>
            {pageCount != "" ? (
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
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default MealType;
