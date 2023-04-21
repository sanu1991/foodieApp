import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import AddProducts from "./AddProducts";
import UpdateProducts from "./UpdateProducts";
import Products from "./Products";
import Logout from "./Logout";
import Profile from "./Profile";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Signup from "./Signup";
import PvtComponent from "./PvtComponent";
import Login from "./Login";

const Container = () => {
  // let auth = null;
  // const localStorageAuth = JSON.parse(localStorage.getItem("user"));
  // const sessionStorageAuth = JSON.parse(sessionStorage.getItem("user"));
  // auth = localStorageAuth === null ? sessionStorageAuth : localStorageAuth;
  // console.log(auth);
  // console.log(localStorageAuth);
  // console.log(sessionStorageAuth);
  // null
  // const params = useParams();
  // console.log(params.id);
  // console.log(auth._id);
  const [auth, setAuth] = useState(null);
  const [logindata, setLogindata] = useState({});
  let fldname = { name: "", email: "", password: "" };
  let fldname1 = { email: "", password: "", remeberMe: true };
  let fldname2 = {
    userId: null,
    resName: "",
    resImg: "",
    location: "",
    state: "",
    PhNo: "",
    cuisines: [],
    costForTwo: "",
    menu: [],
  };
  let fldname3 = {
    menuId: 0,
    name: "",
    type: {},
    vegOrNonVeg: {},
    image: "",
    recipes: "",
    price: "",
  };

  const [signupinput, setSignupinput] = useState(fldname);
  const [logininput, setLogininput] = useState(fldname1);
  const [addProductinput, setaddProductinput] = useState(fldname2);
  const [menuinput, setMenuinput] = useState(fldname3);
  const [productDetails, setproductDetails] = useState([]);

  const handleChange = (key, value) => {
    setSignupinput((values) => ({ ...values, [key]: value }));
  };
  const handleChange1 = (key, value) => {
    setLogininput((values) => ({ ...values, [key]: value }));
  };
  const handleChange2 = (key, value) => {
    setaddProductinput((values) => ({ ...values, [key]: value }));
  };
  const handleChange3 = (key, value) => {
    // console.log(key, value, id);
    // menuinput[id - 1][key] = value;
    // menuinput.map((itm) => {
    //   console.log(itm);
    //   if (itm.menuId === id) {
    //     itm[key] = value
    //   }
    // })
    // console.log(menuinput);
    setMenuinput((values) => ({ ...values, [key]: value }));
    // console.log(menuinput);
  };

  // let userid = auth?.id;
  const getProducts = async () => {
    // let res = await fetch(`http://localhost:5000/${logindata._id}`);
    // if (auth?._id !== undefined) {
    if (auth !== null) {
      let res = await fetch(`http://localhost:5000/${auth?._id}`);
      res = await res.json();
      // console.log(res);
      setaddProductinput(res);
    }
    // setproductDetails(res[0]);

    // let ftchResult = await fetch('http://localhost:5000/', {
    //   method: "post",
    //   body: JSON.stringify({ userId: userid }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // })
    // ftchResult = await ftchResult.json();
    // setproductDetails(ftchResult);
    // setaddProductinput(ftchResult);
  };

  useEffect(() => {
    const localStorageAuth = JSON.parse(localStorage.getItem("user"));
    const sessionStorageAuth = JSON.parse(sessionStorage.getItem("user"));
    setAuth(localStorageAuth === null ? sessionStorageAuth : localStorageAuth);
    console.log(auth);
    // addProductinput.userId = auth?._id;
  }, [logindata]);

  useEffect(() => {
    console.log(addProductinput);
  }, [addProductinput]);

  useEffect(() => {
    console.log(auth);
    auth !== null && getProducts(auth);
  }, [auth]);

  return (
    <>
      <Router>
        <Navbar
          auth={auth}
          setAuth={setAuth}
          productDetails={productDetails}
          addProductinput={addProductinput}
          setaddProductinput={setaddProductinput}
        />
        <Routes>
          <Route element={<PvtComponent />}>
            <Route
              path="/"
              exact
              element={
                <Products
                  addProductinput={addProductinput}
                  productDetails={productDetails}
                />
              }
            ></Route>

            {addProductinput.userId === null ? (
              <Route
                path="/addProducts"
                exact
                element={
                  <AddProducts
                    auth={auth}
                    addProductinput={addProductinput}
                    getProducts={getProducts}
                    fldname2={fldname2}
                    setaddProductinput={setaddProductinput}
                    menuinput={menuinput}
                    fldname3={fldname3}
                    setMenuinput={setMenuinput}
                    handleChange={handleChange2}
                    handleChange3={handleChange3}
                  />
                }
              ></Route>
            ) : (
              <Route
                path="/updateProducts"
                exact
                element={
                  <UpdateProducts
                    auth={auth}
                    addProductinput={addProductinput}
                    productDetails={productDetails}
                    menuinput={menuinput}
                    fldname3={fldname3}
                    setMenuinput={setMenuinput}
                    handleChange={handleChange2}
                    handleChange3={handleChange3}
                  />
                }
              ></Route>
            )}
            {/* <Route path="/profile" exact element={<Profile />}></Route> */}
          </Route>

          <Route
            path="/signup"
            exact
            element={<Signup input={signupinput} handleChange={handleChange} />}
          ></Route>
          <Route
            path="/login"
            exact
            element={
              <Login
                getProducts={getProducts}
                input={logininput}
                handleChange={handleChange1}
                logindata={logindata}
                setLogindata={setLogindata}
              />
            }
          ></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default Container;
