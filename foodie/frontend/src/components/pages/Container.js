import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ContextProvider } from "../context/MainContext";
import Home from "./Home";
import MealType from "./MealType";
import RestaurentDetails from "./RestaurentDetails";

const Container = () => {
  

  return (
    <>
      <ContextProvider>
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/meal" exact element={<MealType />}></Route>
            <Route path="/restaurentDetails/:id" exact element={<RestaurentDetails />}></Route>
            {/* <Route path="/meal/restaurentDetails/:id" exact element={<RestaurentDetails />}></Route> */}
          </Routes>
        </Router>
      </ContextProvider>
    </>
  );
};

export default Container;
