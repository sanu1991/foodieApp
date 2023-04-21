import React, { useEffect,useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { Context } from "../context/MainContext";
// import { gapi } from "gapi-script";

const SignOut = (props) => {

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
  } = useContext(Context);

  const clientId =
    "575246396982-kksv7k0fve44sb315f38esq0gj8lch8k.apps.googleusercontent.com";

  const onSuccess = (res) => {
    console.log("success:", res);
    if (res === undefined) {
      setLoginDetails(0);
    }
  };

  const onFailure = (err) => {
    console.log("failed:", err);
  };

  return (
    <>
      <GoogleLogout
        clientId={clientId}
        // buttonText="Logout"
        onLogoutSuccess={onSuccess}
        onFailure={onFailure}
        render={renderProps => (
          <button
              type="button"
              className="btnInLoginModals cmnTxtClr w-100"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Logout
            </button>
          )}
      />
      {/* <GoogleLogin
        clientId={'658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      >
        <FontAwesome
          name='google'
        />
        <span> Login with Google</span>
      </GoogleLogin> */}
    </>
  );
};

export default SignOut;
