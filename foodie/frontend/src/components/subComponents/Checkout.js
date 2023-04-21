import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const Checkout = (props) => {
  const { checkoutVisibility, setCheckoutVisibility } = props;
  const onHide = () => {
    setCheckoutVisibility(false);
  };
  return (
    <div>
      <Modal
        size="fullscreen"
        show={checkoutVisibility}
        onHide={() => onHide()}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className="cmnTxtClr">
              <b>Checkout</b>
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="menuListModalBody p-3">
          {/* <form class="row px-xl-5" onSubmit={handleSubmit}> */}
          <form class="row px-xl-5">
            <div class="col-lg-7">
              <div class="mb-4">
                <h4 class="mb-4">Billing Address</h4>
                <div class="row" style={{ lineHeight: "50px" }}>
                  <div class="col-md-6 form-group">
                    <label for="fstnm" class="form-label">
                      FIRST NAME
                    </label>
                    <input
                      type="text"
                      name="fstnm"
                      //   value={inputs.fstnm || ""}
                      //   onChange={handleChange}
                      class="form-control"
                      id="fstnm"
                      required
                    />
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="lstnm" class="form-label">
                      LAST NAME
                    </label>
                    <input
                      type="text"
                      name="lstnm"
                      //   value={inputs.lstnm || ""}
                      //   onChange={handleChange}
                      class="form-control"
                      id="lstnm"
                      required
                    />
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="email" class="form-label">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      //   value={inputs.email || ""}
                      //   onChange={handleChange}
                      class="form-control"
                      id="email"
                      required
                    />
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="mobile" class="form-label">
                      MOBILE NO.
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      //   value={inputs.mobile || ""}
                      //   onChange={handleChange}
                      class="form-control"
                      id="mobile"
                      required
                    />
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="address1" class="form-label">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      name="address1"
                      //   value={inputs.address1 || ""}
                      //   onChange={handleChange}
                      class="form-control"
                      id="address1"
                      required
                    />
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="address2" class="form-label">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="address2"
                      //   value={inputs.address2 || ""}
                      //   onChange={handleChange}
                      class="form-control"
                      id="address2"
                      required
                    />
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="country" class="form-label">
                      Country
                    </label>
                    <select
                      class="custom-select"
                      name="country"
                      //   value={inputs.country || ""}
                      //   onChange={handleChange}
                      id="country"
                    >
                      <option selected="">United States</option>
                      <option>INDIA</option>
                    </select>
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="city" class="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      //   value={inputs.city || ""}
                      //   onChange={handleChange}
                      class="form-control"
                      id="city"
                      required
                    />
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="state" class="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      //   value={inputs.state || ""}
                      //   onChange={handleChange}
                      class="form-control"
                      id="state"
                      required
                    />
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="zip" class="form-label">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      //   value={inputs.zip || ""}
                      //   onChange={handleChange}
                      class="form-control"
                      id="zip"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="card mb-5">
                <div class="card-header bg-danger text-light border-0">
                  <h4 class=" m-0">Order Total</h4>
                </div>
                <div class="card-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Products</th>
                        <th scope="col text-center">Quantity</th>
                        <th scope="col text-center">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {checkout.Item.map((curItem) => ( */}
                      <tr>
                        <td>sdfghj</td>
                        <td className="text-center">12</td>
                        <td className="text-center">1236 ₹</td>
                      </tr>
                      {/* ))} */}
                      <tr className="fw-bold">
                        <td>Subtotal</td>
                        <td className="text-center">12</td>
                        <td className="text-center">1236 ₹</td>
                      </tr>
                      <tr className="fw-bold">
                        <td>Shipping</td>
                        <td className="text-center"></td>
                        <td className="text-center">10 ₹</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="card-footer border-secondary bg-transparent">
                  <div class="d-flex justify-content-between mt-2">
                    <h5>Total</h5>
                    <h5>1234 ₹</h5>
                  </div>
                </div>
              </div>
              <div class="card border-secondary mb-5">
                <div class="card-header bg-danger text-light border-0">
                  <h4 class="m-0">Payment</h4>
                </div>
                <div class="card-body">
                  <div class="form-group">
                    <div class="custom-control custom-radio">
                      <input
                        type="radio"
                        class="custom-control-input"
                        name="payment"
                        id="paypal"
                      />
                      <label class="custom-control-label" for="paypal">
                        Paypal
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="custom-control custom-radio">
                      <input
                        type="radio"
                        class="custom-control-input"
                        name="payment"
                        id="directcheck"
                      />
                      <label class="custom-control-label" for="directcheck">
                        Direct Check
                      </label>
                    </div>
                  </div>
                  <div class="">
                    <div class="custom-control custom-radio">
                      <input
                        type="radio"
                        class="custom-control-input"
                        name="payment"
                        id="banktransfer"
                      />
                      <label class="custom-control-label" for="banktransfer">
                        Bank Transfer
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col-12 d-grid card-footer">
                  <button
                    type="submit"
                    class="btn btn-lg btn-block btn-danger font-weight-bold my-3 py-3"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Checkout;
