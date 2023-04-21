import React, { useState } from "react";
import { useEffect } from "react";
import {
  // restaurantList,
  countryList,
  mealList,
  CuisineList,
  CostForTwoList,
  SortList,
} from "../subComponents/fkData";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  let FrmFldName = {
    location: "",
    restaurant: "",
    cuisines: "",
    // cuisines: new Array(CuisineList.length).fill(false),
    costForTwo: "",
    sort: "",
  };
  const [input, setInput] = useState(FrmFldName);

  const [loginDetails, setLoginDetails] = useState(0);
  const [mealTypeDetails, setMealTypeDetails] = useState("");

  const [cuisinesDataQuery, setcuisinesDataQuery] = useState({});

  const [restaurantList, setrestaurantList] = useState([]);

  const [selectRestaurant, setSelectRestaurant] = useState({});

  const [selectSort, setSelectSort] = useState([]);

  const [filteredDataVisible, setFilteredDataVisible] = useState(false);
  const [selectMapFuncData, setSelectMapFuncData] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [modalHandle, setModalHandle] = useState("");
  const [menuListVisibility, setMenuListVisibility] = useState(false);
  const [cartVisibility, setCartVisibility] = useState(false);
  const [checkoutVisibility, setCheckoutVisibility] = useState(false);

  const [noOfItemAtcart, setNoOfItemAtcart] = useState(0);
  const [itemAtcart, setItemAtcart] = useState([]);

  const handleChange = (key, value) => {
    setInput((values) => ({ ...values, [key]: value }));
  };

  const collectdata = async () => {
    let location = input.location;
    let costForTwo = input.costForTwo;
    let cuisines = input.cuisines;
    // console.log({ location, costForTwo, cuisines: cuisinesDataQuery })
    let bodyObj = {};
    if (location !== "" && costForTwo !== "" && cuisines !== "") {
      bodyObj = { location, costForTwo, cuisines: cuisinesDataQuery };
    } else if (location !== "" && costForTwo !== "") {
      bodyObj = { location, costForTwo };
    } else if (location !== "" && cuisines !== "") {
      bodyObj = { location, cuisines: cuisinesDataQuery };
    } else if (costForTwo !== "" && cuisines !== "") {
      bodyObj = { costForTwo, cuisines: cuisinesDataQuery };
    } else if (location !== "") {
      bodyObj = { location };
    } else if (costForTwo !== "") {
      bodyObj = { costForTwo };
    } else if (cuisines !== "") {
      bodyObj = { cuisines: cuisinesDataQuery };
    } else if (location === "" && costForTwo === "" && cuisines === "") {
      bodyObj = {};
    }

    let ftchResult = await fetch("http://localhost:5001/mealfilter/", {
      method: "post",
      // body: JSON.stringify({ location}),
      // body: JSON.stringify({ location, costForTwo: 2000 }),
      // body: JSON.stringify({ location, costForTwo, cuisines: cuisinesDataQuery }),
      body: JSON.stringify(bodyObj),
      // body: JSON.stringify({ location, costForTwo }),
      // body: JSON.stringify({costForTwo}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    ftchResult = await ftchResult.json();
    console.log(ftchResult);
    setrestaurantList(ftchResult);
  };

  useEffect(() => {
    collectdata();
    // }, [input.location])
    // }, [input.location, input.costForTwo])
  }, [input.location, input.costForTwo, input.cuisines]);
  // }, [input.costForTwo])

  useEffect(() => {
    console.log(input);
  }, [input]);

  useEffect(() => {
    console.log(itemAtcart);
  }, [itemAtcart]);

  // useEffect(() => {
  //   console.log(restaurantList);
  // }, [restaurantList]);

  return (
    <Context.Provider
      value={{
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

        selectRestaurant,
        setSelectRestaurant,

        // selectLocation,
        // setSelectLocation,
        // selectLocationAfterCuisines,
        // setSelectLocationAfterCuisines,
        // selectLocationAfterCft,
        // setSelectLocationAfterCft,

        // selectCuisines,
        // setSelectCuisines,
        // selectCuisinesAfterLocation,
        // setSelectCuisinesAfterLocation,
        // selectCuisinesAfterCft,
        // setSelectCuisinesAfterCft,

        // selectCft,
        // setSelectCft,
        // selectCftAfterLocation,
        // setSelectCftAfterLocation,
        // selectCftAfterCuisines,
        // setSelectCftAfterCuisines,

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
        menuListVisibility,
        setMenuListVisibility,
        cartVisibility, 
        setCartVisibility,
        checkoutVisibility, 
        setCheckoutVisibility,

        noOfItemAtcart,
        setNoOfItemAtcart,
        itemAtcart,
        setItemAtcart,
      }}
    >
      {children}
    </Context.Provider>
  );
};
