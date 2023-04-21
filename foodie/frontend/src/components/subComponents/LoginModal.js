import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
// import gmailIcon from "../images/NewFolder/gmail.png";
// import fbIcon from "../images/NewFolder/fb.png";
import SignIn from "./SignIn";
import { Context } from "../context/MainContext";

const LoginModal = (props) => {

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

  const handleClose = () => {
    setModalShow(false);
    setModalHandle("");
  };

  return (
    <>
      <Modal size="sm" show={modalShow} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="cmnTxtClr">
              <b>
                {modalHandle === 0
                  ? "Login"
                  : modalHandle === 1
                  ? "Sign Up"
                  : null}
              </b>
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* sign in button func.  */}
          <SignIn />
          
          <hr className="hr" />
          <p className="loginQuery cmnTxtClr">
            {/* <span>Don't have account?</span>{" "} */}
            <span>
              {modalHandle === 0
                ? "Don't have account?"
                : props.modalHandle === 1
                ? "Already have an account?"
                : null}
            </span>{" "}
            <span
              onClick={() => {
                if (modalHandle === 0) {
                  setModalHandle(1);
                } else {
                  setModalHandle(0);
                }
              }}
              className="modalSignupBtn"
            >
              {modalHandle === 0
                ? "Sign Up"
                : modalHandle === 1
                ? "Login"
                : null}
            </span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
