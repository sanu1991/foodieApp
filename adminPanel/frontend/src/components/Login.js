import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";

const Login = (props) => {
  const { input, handleChange, logindata, setLogindata, getProducts } = props;
  let email = input.email;
  let password = input.password;

  const Navigate = useNavigate(); // to navigate

  const [passSwHd, setPassSwHd] = useState(true);

  const collectdata = async () => {
    let ftchResult = await fetch("http://localhost:5000/login/", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    ftchResult = await ftchResult.json();
    // console.log(ftchResult);
    setLogindata(ftchResult);
    if (ftchResult.result !== "No user Found") {
      if (input.remeberMe === true) {
        localStorage.setItem("user", JSON.stringify(ftchResult));
        sessionStorage.setItem("user", JSON.stringify(ftchResult));
      } else {
        sessionStorage.setItem("user", JSON.stringify(ftchResult));
      }
      Navigate("/"); // to navigate
    } else {
      alert("Please enter correct details !");
    }
  };

  useEffect(() => {
    let auth = null;
    const localStorageAuth = localStorage.getItem("user");
    const sessionStorageAuth = sessionStorage.getItem("user");
    auth = localStorageAuth === null ? sessionStorageAuth : localStorageAuth;
    auth !== null && Navigate(`/`);
  }, []);

  //   useEffect(() => {
  //     console.log(passSwHd)
  //   }, [passSwHd])

  return (
    <div style={{ padding: "20% 30%" }}>
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
      <div class="row mb-3">
        <div className="col-3">
          <label for="inputPassword" className="col-form-label">
            Password
          </label>
        </div>
        <div className="col-9">
          <div className="input-group">
            <input
              type={passSwHd === true ? "password" : "text"}
              class="form-control"
              aria-describedby="basic-addon1"
              value={input.password}
              onChange={(e) => handleChange("password", e.target.value)}
            ></input>
            <span
              class="input-group-text"
              id="basic-addon1"
              onClick={() => setPassSwHd(!passSwHd)}
            >
              {passSwHd === false ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
            </span>
          </div>
        </div>
      </div>
      <div class="mb-3 form-check">
        <input
          class="form-check-input"
          type="checkbox"
          //   value={input.remeberMe}
          id="flexCheckChecked"
          checked={input.remeberMe}
          onChange={(e) => handleChange("remeberMe", e.target.checked)}
        ></input>
        <label class="form-check-label" for="flexCheckChecked">
          Remember Me
        </label>
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

export default Login;
