import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import {
  Route,
  Link,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
import {
  // restaurantList,
  countryList,
  mealList,
  CuisineList,
  CostForTwoList,
  SortList,
} from "./fkData";

const ProductComponent = (props) => {
  const {
    auth,
    getProducts,
    handleChange,
    addProductinput,
    productDetails,
    menuinput,
    setMenuinput,
    handleChange3,
    fldname3,
  } = props;
  const location = useLocation();
  // console.log(location.pathname);

  const Navigate = useNavigate(); // to navigate

  const menuEdit = (index) => {
    let EditableProducts = addProductinput.menu.filter(
      (i) => i.menuId === index
    );
    console.log(EditableProducts);
    setMenuinput(EditableProducts[0]);
  };

  let cuisinesList = [
    { value: 1, label: "North Indian" },
    { value: 2, label: "South Indian" },
    { value: 3, label: "Chinese" },
    { value: 4, label: "Fast Food" },
    { value: 5, label: "Street Food" },
  ];

  let vegOrNonVeg = [
    { value: 1, label: "Veg" },
    { value: 2, label: "Non Veg" },
  ];

  let menuType = [
    { value: 1, label: "Mocktail" },
    { value: 2, label: "Indian Main Course Veg" },
    { value: 3, label: "Rice and Biryani" },
    { value: 4, label: "Pizza" },
    { value: 5, label: "Burgers" },
    { value: 6, label: "Sandwich" },
  ];

  const addToMenu = () => {
    menuinput.menuId = addProductinput.menu.length + 1;
    addProductinput.menu.push(menuinput);
    setMenuinput(fldname3);
    // console.log(addProductinput);
  };

  const editMenu = (id) => {
    // console.log(id);
    addProductinput.menu.map((i) => {
      if (i.menuId === id) {
        i.name = menuinput.name;
        i.type = menuinput.type;
        i.vegOrNonVeg = menuinput.vegOrNonVeg;
        i.image = menuinput.image;
        i.recipes = menuinput.recipes;
        i.price = menuinput.price;
      }
    });
    setMenuinput(fldname3);
    // console.log(addProductinput);
  };

  const menuItemDlt = (id) => {
    // console.log(id);
    addProductinput.menu.splice(id, 1);
    addProductinput.menu.map((i, index) => {
      // console.log(i, index);
      i.menuId = index + 1;
    });
    setMenuinput(fldname3);
    // console.log(addProductinput);
  };

  const saveMenuData = () => {
    if (location.pathname === "/addProducts") {
      addToMenu();
    } else if (location.pathname === "/updateProducts") {
      editMenu(menuinput?.menuId);
    }
  };

  const collectdata = async (addProductinput) => {
    // const collectdata = (addProductinput) => {
    const formdata = new FormData();
    // formdata.append("userId", auth?._id);
    formdata.append("userId", addProductinput.userId);
    formdata.append("resName", addProductinput.resName);
    // formdata.append('resImg', addProductinput.resImg, addProductinput.resImg.name);
    formdata.append("resImg", addProductinput.resImg);
    formdata.append("location", addProductinput.location);
    formdata.append("state", addProductinput.state);
    formdata.append("PhNo", addProductinput.PhNo);
    formdata.append("cuisines", addProductinput.cuisines);
    formdata.append("costForTwo", addProductinput.costForTwo);
    formdata.append("menu", addProductinput.menu);

    // data post to database name- 'products'
    if (location.pathname === "/addProducts") {
      // let ftchResult = await fetch("http://localhost:5000/addProducts/", {
      //   method: "post",
      //   body: JSON.stringify(addProductinput),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      let ftchResult = await fetch("http://localhost:5000/addProducts/", {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "form-data",
        },
        body: formdata,
      });
      // getProducts(auth);
      // console.log(ftchResult)
      // ftchResult = await ftchResult.json();
      // ftchResult &&
      // Navigate("/");

      // console.log(formdata);
      // axios.post("http://localhost:5000/addProducts/", formdata).then((res) => {
      //   res && Navigate("/");
      // });
    } else if (location.pathname === `/updateProducts`) {
      let ftchResult = await fetch(
        `http://localhost:5000/updateProducts/${addProductinput.userId}`,
        {
          method: "Put",
          body: JSON.stringify(addProductinput),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      ftchResult = await ftchResult.json();
      ftchResult && Navigate("/");
    }
  };

  // useEffect(() => {
  //   console.log(auth);
  // }, [auth]);

  return (
    // updateProducts

    <div>
      {/* Basic Details */}
      <div>
        <div className="mb-3 row">
          <label className="col-2 col-form-label">Name</label>
          <div className="col-10">
            {location.pathname === "/addProducts" ||
            location.pathname === "/updateProducts" ? (
              <input
                type="text"
                className="form-control"
                value={addProductinput.resName}
                onChange={(e) => handleChange("resName", e.target.value)}
              ></input>
            ) : location.pathname === "/" ? (
              <p>{addProductinput.resName}</p>
            ) : null}
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-2 col-form-label">Upload Photo</label>
          <div className="col-10">
            {location.pathname === "/addProducts" ||
            location.pathname === "/updateProducts" ? (
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  handleChange("resImg", event.target.files[0]);
                }}
              ></input>
            ) : location.pathname === "/" ? (
              <p>{addProductinput.resImg}</p>
            ) : null}
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-2 col-form-label">Location</label>
          <div className="col-10">
            {location.pathname === "/addProducts" ||
            location.pathname === "/updateProducts" ? (
              // <input type="text" className="form-control" value={addProductinput.location} onChange={(e) => handleChange("location", e.target.value)}></input>
              <select
                class="form-select"
                id="inputGroupSelect0"
                onChange={(e) => {
                  handleChange("location", e.target.value);
                }}
                value={addProductinput.location}
              >
                <option selected>Select Location</option>
                {countryList.map((itm, index) => (
                  // console.log(index)
                  <option option key={index} value={itm.capital}>
                    {itm.capital}
                  </option>
                ))}
              </select>
            ) : location.pathname === "/" ? (
              <p>{addProductinput.location}</p>
            ) : null}
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-2 col-form-label">State</label>
          <div className="col-10">
            {location.pathname === "/addProducts" ||
            location.pathname === "/updateProducts" ? (
              //   <input
              //     type="text"
              //     className="form-control"
              //     value={addProductinput.state}
              //     onChange={(e) => handleChange("state", e.target.value)}
              //   ></input>
              <select
                class="form-select"
                id="inputGroupSelect01"
                onChange={(e) => {
                  handleChange("state", e.target.value);
                }}
                value={addProductinput.state}
              >
                <option selected>Select State</option>
                {countryList.map(
                  (itm, index) =>
                    itm.capital === addProductinput.location && (
                      <option option key={index} value={itm.name}>
                        {itm.name}
                      </option>
                    )
                )}
              </select>
            ) : location.pathname === "/" ? (
              <p>{addProductinput.state}</p>
            ) : null}
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-2 col-form-label">Phone No</label>
          <div className="col-10">
            {location.pathname === "/addProducts" ||
            location.pathname === "/updateProducts" ? (
              <input
                type="number"
                className="form-control"
                value={addProductinput.PhNo}
                onChange={(e) => handleChange("PhNo", e.target.value)}
              ></input>
            ) : location.pathname === "/" ? (
              <p>{addProductinput.PhNo}</p>
            ) : null}
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-2 col-form-label">Cuisines</label>
          <div className="col-10">
            {
              location.pathname === "/addProducts" ||
              location.pathname === "/updateProducts" ? (
                <Select
                  // defaultValue={addProductinput.cuisines}
                  value={addProductinput.cuisines}
                  isMulti
                  options={cuisinesList}
                  classNameName="basic-multi-select"
                  classNameNamePrefix="select"
                  onChange={(e) => {
                    handleChange("cuisines", e);
                  }}
                />
              ) : location.pathname === "/" ? (
                <p>
                  {addProductinput.cuisines !== undefined &&
                    addProductinput.cuisines.map((i) => i.label).toString()}
                </p>
              ) : null
              // : location.pathname === "/" ? <h5>sanu</h5> : null
            }
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-2 col-form-label">Cost For Two</label>
          <div className="col-10">
            {location.pathname === "/addProducts" ||
            location.pathname === "/updateProducts" ? (
              <input
                type="number"
                className="form-control"
                value={addProductinput.costForTwo}
                onChange={(e) => handleChange("costForTwo", e.target.value)}
              ></input>
            ) : location.pathname === "/" ? (
              <p>{addProductinput.costForTwo}</p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Menu Datagrid */}
      <div
        className="mb-3 row"
        style={{
          border: "0.5px solid #BEBEBE",
          borderRadius: "10px",
          padding: "10px 0px",
        }}
      >
        <b className="col-2">Menu</b>
        {location.pathname === "/addProducts" ||
        location.pathname === "/updateProducts" ? (
          <div className="col-10" style={{ textAlign: "right" }}>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => setMenuinput(fldname3)}
            >
              Add
            </button>
          </div>
        ) : null}
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col" style={{ width: "5%", textAlign: "center" }}>
                Sl No
              </th>
              <th scope="col" style={{ width: "10%" }}>
                Name
              </th>
              <th scope="col">Type</th>
              <th scope="col">Veg or Nonveg</th>
              <th scope="col">Image</th>
              <th scope="col">Recipes</th>
              <th scope="col">Price</th>
              {location.pathname === "/updateProducts" ? (
                <th scope="col" style={{ width: "13%", textAlign: "center" }}>
                  Action
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {addProductinput.menu[0] !== "" &&
              addProductinput.menu.map((itm, index) => (
                <tr key={index}>
                  <th style={{ textAlign: "center" }} scope="row">
                    {itm.menuId}
                  </th>
                  <td>{itm.name}</td>
                  <td>{itm.type.label}</td>
                  <td>{itm.vegOrNonVeg.label}</td>
                  <td>{itm.image}</td>
                  <td>{itm.recipes}</td>
                  <td>{itm.price}</td>
                  {location.pathname === "/updateProducts" ? (
                    <td style={{ textAlign: "center" }}>
                      {/* <button style={{ margin: "2%" }} className="btn btn-primary" type="button" onClick={(e) => menuEdit(index + 1)}>Edit</button> */}
                      <button
                        style={{ margin: "2%" }}
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={(e) => menuEdit(index + 1)}
                      >
                        Edit
                      </button>
                      <button
                        style={{ margin: "2%" }}
                        className="btn btn-primary"
                        type="button"
                        onClick={(e) => menuItemDlt(index)}
                      >
                        Delete
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* submit button */}
      {location.pathname === "/addProducts" ||
      location.pathname === "/updateProducts" ? (
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              // console.log(auth);
              addProductinput.userId = auth?._id;
              // console.log(addProductinput);
              collectdata(addProductinput);
            }}
          >
            Submit
          </button>
        </div>
      ) : null}

      {/* add / edit menu modal */}
      {location.pathname === "/addProducts" ||
      location.pathname === "/updateProducts" ? (
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Menu Details
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3 row">
                  <label className="col-2 col-form-label">Name</label>
                  <div className="col-10">
                    <input
                      type="text"
                      className="form-control"
                      value={menuinput?.name}
                      onChange={(e) => handleChange3("name", e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-2 col-form-label">Type</label>
                  <div className="col-10">
                    <Select
                      // defaultValue={menuinput.type}
                      value={menuinput?.type}
                      options={menuType}
                      classNameName="basic-multi-select"
                      classNameNamePrefix="select"
                      onChange={(e) => {
                        // console.log(e)
                        handleChange3("type", e);
                      }}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-2 col-form-label">Veg or Nonveg</label>
                  <div className="col-10">
                    <Select
                      // defaultValue={menuinput.vegOrNonVeg}
                      value={menuinput?.vegOrNonVeg}
                      options={vegOrNonVeg}
                      classNameName="basic-multi-select"
                      classNameNamePrefix="select"
                      onChange={(e) => {
                        handleChange3("vegOrNonVeg", e);
                      }}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-2 col-form-label">Upload Photo</label>
                  <div className="col-10">
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      onChange={(event) => {
                        console.log(event.target.files[0]);
                        handleChange3("image", event.target.files[0].name);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-2 col-form-label">Recipes</label>
                  <div className="col-10">
                    <textarea
                      className="form-control"
                      id="floatingTextarea"
                      value={menuinput?.recipes}
                      onChange={(e) => handleChange3("recipes", e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-2 col-form-label">Price</label>
                  <div className="col-10">
                    <input
                      type="number"
                      className="form-control"
                      value={menuinput?.price}
                      onChange={(e) => handleChange3("price", e.target.value)}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => saveMenuData()}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductComponent;
