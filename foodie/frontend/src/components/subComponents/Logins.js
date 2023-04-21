import React, { useContext } from "react";
import LoginModal from "./LoginModal";
import SignOut from "./SignOut";
import { Context } from "../context/MainContext";

const Logins = (props) => {

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
    setModalHandle
  } = useContext(Context);

  const handleShow = () => {
    setModalShow(true);
    setModalHandle(0);
  };
  const handleShow1 = () => {
    setModalShow(true);
    setModalHandle(1);
  };

  const loginsSet = () => {
    if (loginDetails === 0 || loginDetails == undefined) {
      return (
        <div class="d-flex">
          <button type="button" className="loginBtn" onClick={handleShow}>
            Login
          </button>
          <button type="button" className="loginBtn" onClick={handleShow1}>
            Create an account
          </button>
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={loginDetails.imageUrl}
            alt="error"
            width="43px"
            style={{ borderRadius: "50%" }}
          />
          <h6 style={{ color: "white" }}>{loginDetails.email}</h6>
          <SignOut />
        </div>
      );
    }
  };

  // useEffect(() => {
  //   console.log(props.loginDetails)
  // }, [props.loginDetails])

  return (
    <>
      {loginsSet()}

      {/* modals for login */}
      <LoginModal />
    </>
  );
};

export default Logins;
