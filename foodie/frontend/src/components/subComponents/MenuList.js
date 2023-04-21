import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { Context } from "../context/MainContext";
import { restaurantList } from "../subComponents/fkData";

const MenuList = (props) => {
  const {
    selectRestaurant,
    menuListVisibility,
    setMenuListVisibility,
    noOfItemAtcart,
    setNoOfItemAtcart,
    itemAtcart,
    setItemAtcart,
    setCartVisibility
  } = props;

  // const itemAdd = () => {
  //   if(itemAtcart === null) { setItemAtcart(Number(itemAtcart)+1) } else {setItemAtcart(itemAtcart++)}
  // }

  const [buyerDetailsModalVisibility, setBuyerDetailsModalVisibility] =
    useState(false);

  const onHide = () => {
    setMenuListVisibility(false);
  };
  const onHide1 = () => {
    setBuyerDetailsModalVisibility(false);
  };

  const addToCart = (selectRestaurant, itm1, index) => {
    let findDup = itemAtcart.filter(
      (itm) => itm.resName === selectRestaurant.resName && itm.itmName === itm1.name
    );
    // console.log(findDup);
    if (findDup.length === 0) {
      let resName = selectRestaurant.resName;
      let resImg = selectRestaurant.resImg;
      let itmName = itm1.name;
      let itmImg = itm1.image;
      let itmCat = itm1.vegOrNonVeg.label;
      let itmType = itm1.type.label;
      let itmPrice = itm1.price;
      let itmQty = 1;

      let itemsDetails = {
        resName: resName,
        resImg: resImg,
        itmName: itmName,
        itmImg: itmImg,
        itmCat: itmCat,
        itmType: itmType,
        itmPrice: itmPrice,
        itmQty: itmQty,
        itmTotalPrice: itmPrice * itmQty
      };

      setNoOfItemAtcart(Number(noOfItemAtcart) + 1);
      setItemAtcart((values) => [...values, itemsDetails]);
    } else {
      alert("This item already added in your cart !");
    }
  };

  return (
    <>
      {/* // menu list modal // */}
      <Modal
        // size="xl"
        // size="fullscreen"
        size="lg"
        show={menuListVisibility}
        onHide={() => onHide()}
        centered
      >
        <Modal.Header className="menuListModalTitle" closeButton>
          <Modal.Title>
            <h3 className="cmnTxtClr">
              <b>{selectRestaurant.resName}</b>
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="menuListModalBody p-3">
          {selectRestaurant.menu.map((itm1, index) => (
            <>
              <div class="card menuListCard" key={index}>
                <div class="row g-0">
                  <div className="col-md-9">
                    {/* <img
                        src={itm1.vegOrNonVeg}
                        class="img-fluid vegOrNonVeg"
                        alt="error"
                      /> */}
                    <h6 class="menuListCardTitle">{itm1.name}</h6>
                    <p class="menuListCardAddress">{itm1.type.label}</p>
                    <h6 class="menuListCardRating">
                      <b>₹ {itm1.price}</b>
                    </h6>
                    <p class="menuListCardAddress">{itm1.recipes}</p>
                  </div>
                  <div className="col-md-3 menuListCardImgAddBtn">
                    {/* <img src={itm1.image} class="img-fluid" alt="error" /> */}
                    <button
                      type="button"
                      className="btn btn-outline-success menuListCardAddBtn"
                      onClick={(e) => {
                        // console.log(selectRestaurant, itm1, index);
                        // setNoOfItemAtcart(Number(noOfItemAtcart) + 1);
                        addToCart(selectRestaurant, itm1, index);
                        // setItemAtcart();
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}
        </Modal.Body>
        <Modal.Footer className="menuListModalFooter d-flex justify-content-center">
          {/* <h3 className="cmnTxtClr">
            <b>Subtotal</b>
          </h3>
          <h3 className="cmnTxtClr">
            <b>₹ </b>
          </h3> */}
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => setCartVisibility(true)}
            // onClick={() => setBuyerDetailsModalVisibility(true)}
          >
            Your Cart Details
          </button>
        </Modal.Footer>
      </Modal>

      {/* // place order modal // */}
      <Modal
        size="lg"
        show={buyerDetailsModalVisibility}
        onHide={() => onHide1()}
        centered
      >
        <Modal.Header className="menuListModalTitle" closeButton>
          <Modal.Title>
            <h3 className="cmnTxtClr">
              <b>{selectRestaurant.resName}</b>
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="menuListModalBody">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Name
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter your name"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Mobile Number
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Mobile Number"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Address
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Enter your address"
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer className="menuListModalFooter">
          <button type="button" class="btn btn-danger">
            Proceed
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MenuList;
