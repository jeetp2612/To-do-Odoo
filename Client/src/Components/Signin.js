import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [username, setname] = useState("");
  const [pass, setpass] = useState("");
  const [email, setemail] = useState("");
  const [nameError, setnameerror] = useState("");
  const [passError, setpasserror] = useState("");
  const [mailError, setemailerror] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const nameHandler = (e) => {
    var nameval = e.target.value;
    const regex = /^[a-zA-Z]+$/;
    if (nameval === "") {
      setnameerror("*Required");
    } else if (!regex.test(nameval)) {
      setnameerror(
        "First name should not contain number and special characters."
      );
    } else if (nameval.length > 10) {
      setnameerror("First name should be no more than 10 characters.");
    } else if (nameval[0] !== nameval[0].toUpperCase()) {
      setnameerror("First letter should be capitalized.");
    } else {
      setname(nameval);
      setnameerror("");
    }
  };

  const passHandler = (e) => {
    var passval = e.target.value;
    if (passval === "") {
      setpasserror("*Required");
    } else if (passval.length > 16) {
      setpasserror("Password should be no more than 16 characters.");
    } else if (passval.search(/[a-z]/i) < 0) {
      setpasserror("Password must contain at least 1 character");
    } else if (passval.search(/[0-9]/) < 0) {
      setpasserror("Password must contain at least 1 digit");
    } else if (passval.search(/[A-Z]/) < 0) {
      setpasserror("Password must contain at least 1 Uppercase character");
    } else if (passval.search(/[!@#\$%\^&\*]/) < 0) {
      setpasserror("Password must contain at least 1 special character");
    } else {
      passval = window.btoa(passval);
      setpass(passval);
      setpasserror("");
    }
  };

  const emailHandler = (e) => {
    const emailval = e.target.value;
    const reg1 = /^[0-9]*$/;
    const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z]+(?:\.[a-z]{2,3})*$/;
    if (emailval === "") {
      setemailerror("*Required");
    } else if (reg1.test(emailval)) {
      setemailerror("Numbers not allowed");
    } else if (!reg.test(emailval)) {
      setemailerror("Invalid email");
    } else {
      setemail(emailval);
      setemailerror("");
    }
  };

  useEffect(() => {
    fetch("http://localhost:8003/")
      .then((data) => data.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  const Save = (e) => {
    e.preventDefault();
    fetch("http://localhost:8003/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: pass,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message); // Show the alert message
        setSuccessMessage(data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000); // Redirect to login page after 2 seconds
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-lg-4 me-5"></div>
          <div
            className="col-lg mt-2 ms-3"
            style={{ backgroundColor: "#f3f3f3", padding: "20px" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="pt-3 text-secondary">Sign up now</h2>
              <div>
                <i
                  className="fa fa-pencil pt-3"
                  style={{ opacity: "0.3", fontSize: "40px" }}
                  aria-hidden="true"
                ></i>
              </div>
            </div>

            <p className="text-secondary">
              Fill in the form below to get instant access
            </p>
            <form id="form">
              <div className="field">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name.."
                    id="username"
                    onChange={nameHandler}
                    required
                  />
                </div>
                <small style={{ color: "red" }}>{nameError}</small>
              </div>
              <div className="field">
                <div className="input-group mt-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name.."
                    id="lastname"
                  />
                </div>
              </div>
              <div className="field">
                <div className="input-group mt-2">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email.."
                    onChange={emailHandler}
                    required
                  />
                </div>
                <small style={{ color: "red" }}>{mailError}</small>
              </div>

              <div className="field">
                <div className="input-group mt-2">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password.."
                    id="password"
                    onChange={passHandler}
                    required
                  />
                </div>
                <small style={{ color: "red" }}>{passError}</small>
              </div>

              <div className="d-grid mt-3">
                <button
                  className="btn btn-primary"
                  type="button"
                  id="btnSign2"
                  onClick={Save}
                >
                  Sign up!
                </button>
              </div>
            </form>
            <div className="d-flex justify-content-center mt-3">
              <span className="me-1">Have an account?</span>
              <a href="/">Log In.</a>
            </div>
          </div>
          <div className="col-lg-4 me-2"></div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
