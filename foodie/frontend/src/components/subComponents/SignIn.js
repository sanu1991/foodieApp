import React, { useEffect, useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
// import gmailIcon from "../images/NewFolder/othrs/";
import gmailIcon from "../images/NewFolder/gmail.png";
import { Context } from "../context/MainContext";

const SignIn = (props) => {

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

  const refreshTokenSetup = (res1) => {
    let refreshTiming = (res1.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    const refreshToken = async () => {
      const newAuthRes = await res1.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
      console.log(newAuthRes);
      console.log(newAuthRes.id_token);
      setTimeout(refreshToken, refreshTiming);
    };
    setTimeout(refreshToken, refreshTiming);
  };

  const onSuccess = (res) => {
    console.log("[Login Success] currentUser:", res.profileObj); // get full user details
    setModalShow(false);
    setModalHandle("");
    setLoginDetails(res.profileObj);
    refreshTokenSetup(res);
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };

  useEffect(() => {
    function start() {
      gapi.client?.init({
        clientId: process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <>
      <GoogleLogin
        className="signInBtn"
        clientId={clientId}
        // buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        render={renderProps => (
        <button
            type="button"
            className="btnInLoginModals cmnTxtClr w-100"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <img
              className="loginModalPng"
              src={gmailIcon}
              alt="error"
              width="29.39px"
              height="22.04px"
            />
            Continue with Gmail
          </button>
        )}
      />
    </>
  );
};

export default SignIn;
