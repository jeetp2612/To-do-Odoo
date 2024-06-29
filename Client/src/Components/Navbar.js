import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Navbar(props) {
  const navigate = useNavigate();
  const isLogedin = sessionStorage.getItem("name")
    ? sessionStorage.getItem("name")
    : false;
  return (
    <nav className="navbar navbar-light bg-light">
      <p className="navbar-brand">Welcome {sessionStorage.getItem("name")}</p>
      {isLogedin && (
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          onClick={() => {
            sessionStorage.clear();
            navigate("/");
          }}
        >
          <b className="p-1">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </b>
        </button>
      )}
    </nav>
  );
}

export default Navbar;
