import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = (props) => {
  const { input, handleChange } = props;
  let name = input.name;
  let email = input.email;
  let password = input.password;

  const Navigate = useNavigate(); // to navigate

  const collectdata = async () => {
    // console.log(await JSON.stringify({name, email,password}));

    if (name !== "" && email !== "" && password !== "") {
      // data post to database name- 'users'
      let ftchResult = await fetch("http://localhost:5000/signup/", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      ftchResult = await ftchResult.json();
      console.log(ftchResult);
      //   localStorage.setItem("user", JSON.stringify(ftchResult)); // to store data at localstorage
      sessionStorage.setItem("user", JSON.stringify(ftchResult)); // to store data at sessionStorage
      ftchResult && Navigate("/"); // to navigate
    }
  };

//   useEffect(() => {
//     let auth = null;
//     const localStorageAuth = localStorage.getItem("user");
//     const sessionStorageAuth = sessionStorage.getItem("user");
//     auth = localStorageAuth === null ? sessionStorageAuth : localStorageAuth;
//     auth !== null && Navigate(`/`);
//   }, []);

  return (
    <div style={{ padding: "15% 30%" }}>
      <div className="mb-3 row">
        <label for="staticEmail" className="col-3 col-form-label">
          Name
        </label>
        <div className="col-9">
          <input
            type="text"
            className="form-control"
            value={input.name}
            onChange={(e) => handleChange("name", e.target.value)}
          ></input>
        </div>
      </div>
      <div className="mb-3 row">
        <label for="inputPassword" className="col-3 col-form-label">
          Email
        </label>
        <div className="col-9">
          <input
            type="email"
            className="form-control"
            value={input.email}
            onChange={(e) => handleChange("email", e.target.value)}
          ></input>
        </div>
      </div>
      <div className="mb-3 row">
        <label for="inputPassword" className="col-3 col-form-label">
          Password
        </label>
        <div className="col-9">
          <input
            type="password"
            className="form-control"
            value={input.password}
            onChange={(e) => handleChange("password", e.target.value)}
          ></input>
        </div>
      </div>
      <div className="d-grid gap-2">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => collectdata()}
        >
          Button
        </button>
      </div>
    </div>
  );
};

export default Signup;
