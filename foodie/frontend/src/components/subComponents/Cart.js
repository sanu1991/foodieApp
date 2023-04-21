import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import Checkout from "./Checkout";

const Cart = (props) => {
  const {
    cartVisibility,
    setCartVisibility,
    checkoutVisibility, 
    setCheckoutVisibility,
    itemAtcart,
    setItemAtcart,
    noOfItemAtcart,
  } = props;

  const [itmQtyRender, setitmQtyRender] = useState(1);

  const onHide = () => {
    setCartVisibility(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setitmQtyRender(1);
    }, 300);
  }, [itmQtyRender]);

  return (
    <div>
      {/* // cart list modal // */}
      <Modal
        size="fullscreen"
        show={cartVisibility}
        onHide={() => onHide()}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className="cmnTxtClr">
              <b>Cart</b>
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="menuListModalBody p-3">
          {itemAtcart.length !== 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Type</th>
                  <th scope="col">Category</th>
                  <th scope="col">Restaurant Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity(plate)</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {itemAtcart.map((itm, index) => (
                  <tr key={index}>
                    <th scope="row">{itm.itmName}</th>
                    <td>{itm.itmType}</td>
                    <td>{itm.itmCat}</td>
                    <td>{itm.resName}</td>
                    <td>{itm.itmPrice}</td>
                    <td>
                      <div
                        class="input-group quantity"
                        style={{ width: "100px" }}
                      >
                        <div class="input-group-btn">
                          <button
                            class="btn btn-sm btn-dark btn-minus"
                            onClick={(e) => {
                              if (itm.itmQty > 1) {
                                itm.itmQty -= 1;
                                itm.itmTotalPrice = itm.itmPrice * itm.itmQty;
                              }
                              setitmQtyRender(2);
                            }}
                          >
                            <FaMinus className="fs-6" />
                          </button>
                        </div>

                        {itmQtyRender && (
                          <input
                            type="text"
                            class="form-control form-control-sm bg-light text-center"
                            value={itm.itmQty}
                          />
                        )}

                        <div class="input-group-btn">
                        <button
                            class="btn btn-sm btn-dark btn-minus"
                            onClick={(e) => {
                              if (itm.itmQty < 10) {
                                itm.itmQty += 1;
                                itm.itmTotalPrice = itm.itmPrice * itm.itmQty;
                              }
                              setitmQtyRender(2);
                            }}
                          >
                            <FaPlus className="fs-6" />
                          </button>
                        </div>
                      </div>
                    </td>
                    {/* <td>{itm.itmQty}</td> */}
                    <td>{itmQtyRender && itm.itmTotalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2 className="d-flex justify-content-center">
              Your cart is empty !
            </h2>
          )}
          <hr />
          {itemAtcart.length !== 0 ? (
            <div>
              <h1>Summary</h1>
              <h4>Total Items: {itemAtcart.reduce((n, { itmQty }) => n + Number(itmQty), 0)}</h4>
              <h4>Grand Total Price: {itemAtcart.reduce((n, { itmTotalPrice }) => n + Number(itmTotalPrice), 0)} ₹</h4>
            <button type="button" class="btn btn-danger" onClick={() => setCheckoutVisibility(true)}>Checkout</button>
            </div>
          ) : null}
        </Modal.Body>
        {/* <Modal.Footer className="d-flex justify-content-start">
          <h1>Summary</h1> <br />
          <h4>Total Items: </h4> <br />
          <h4>Grand Total Price: ₹ </h4> <br />
        </Modal.Footer> */}
      </Modal>


      <Checkout checkoutVisibility={checkoutVisibility} setCheckoutVisibility={setCheckoutVisibility} />
    </div>
  );
};

export default Cart;
