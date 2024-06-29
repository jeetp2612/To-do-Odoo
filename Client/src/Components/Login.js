import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setname] = useState();
  const [pass, setpass] = useState();
  const [error1, setnameerror] = useState("");
  const [error2, setpasserror] = useState("");

  const nameHandler = (e) => {
    var nameval = e.target.value;
    if (nameval === "") {
      setnameerror("*Required");
    } else {
      setname(nameval);
      setnameerror("");
    }
  };

  const passHandler = (e) => {
    var passval = e.target.value;
    if (passval == "") {
      setpasserror("*Required");
    } else {
      setpass(passval);
      setpasserror("");
    }
  };

  const Save = (e) => {
    e.preventDefault();
    console.log(pass);
    fetch("http://localhost:8003/", {
      method: "POST",
      headers: {
        Authorization: "Odoo Project",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password: window.btoa(pass),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.auth) {
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("name", data.name);
          sessionStorage.setItem("isadmin", data.isadmin);
          if (data.isadmin === 0 || data.isadmin === 1) navigate("/multiuser");
          else navigate("/todo");
        } else {
          alert("Bad Credentials !!");
        }
      });
  };

  return (
    <div>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-lg-4 me-2"></div>
          <div className="col-lg mt-2">
            <div style={{ backgroundColor: "#f3f3f3" }} className="p-3">
              <div className="d-flex justify-content-between">
                <h2 className="text-secondary">Login to our site</h2>
                <div>
                  <i
                    className="fa fa-key"
                    style={{
                      opacity: "0.3",
                      fontSize: "40px",
                    }}
                  ></i>
                </div>
              </div>

              <p className="text-secondary">
                Enter the user name and password to log on
              </p>
              <div>
                <form action="#" id="form">
                  <div className="field">
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Username.."
                      id="username"
                      onChange={nameHandler}
                    />

                    <small style={{ color: "red" }}>{error1}</small>
                  </div>
                  <div className="field">
                    <input
                      type="password"
                      className="form-control mt-2"
                      placeholder="Password.."
                      id="password"
                      onChange={passHandler}
                    />

                    <small style={{ color: "red" }}>{error2}</small>
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    <button
                      className="btn btn-primary flex-fill me-1"
                      id="btnSign"
                      onClick={Save}
                    >
                      Log in!
                    </button>
                  </div>
                </form>
              </div>

              <div>
                <div className="mt-1">
                  <span className="mt-3" style={{ textAlign: "center" }}>
                    Don't have a account yet ?
                  </span>
                  <a href="/signin" className="mt-3">
                    Sign Up
                  </a>
                </div>
                <p className="mt-3" style={{ textAlign: "center" }}>
                  or connect with:
                </p>
                <div className="d-flex justify-content-center">
                  <a
                    href="https://www.facebook.com/login/"
                    className="btn btn-primary me-1 flex-fill"
                    style={{ backgroundColor: "#4762a2" }}
                  >
                    <i className="fa fa-facebook fa-fw"></i>
                    Facebook
                  </a>
                  <a
                    href="https://www.facebook.com/login/"
                    className="btn btn-info me-1 flex-fill text-light"
                    style={{ backgroundColor: "#55abec" }}
                  >
                    <i className="fa fa-twitter fa-fw text-light"></i>
                    Twitter
                  </a>
                  <a
                    href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjIjJ_igob9AhUYwjgGHTf2D7YQFnoECBIQAQ&url=https%3A%2F%2Faccounts.google.com%2Fsignin&usg=AOvVaw37IjAc4ISNLLWBwzDQYEff"
                    className="btn btn-danger flex-fill"
                    style={{ backgroundColor: "#dc4b38" }}
                  >
                    <i className="fa fa-google fa-fw"> </i>
                    Google+
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 me-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
