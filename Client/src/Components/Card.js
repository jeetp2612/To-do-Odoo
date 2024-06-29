import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEdit,
  faTrash,
  faCheck,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";

const Card = (props) => {
  const [user, setUser] = useState({
    name: props.name,
    email: props.email,
    todos: props.todos,
    wip: props.wip,
    done: props.done,
    isAdmin: props.isAdmin,
  });

  const isSuperAdmin = sessionStorage.getItem("isadmin") == 0 ? true : false;
  const isMentor = sessionStorage.getItem("isadmin") == 1 ? true : false;
  const [updatedUser, setUpdate] = useState({
    name: "",
    email: "",
  });

  return (
    <div className="col-sm-3 p-3">
      <div className="card shadow-lg p-1 bg-white rounded-3 ">
        <div className="card-body font-monospace">
          <div className="mb-3 text-center">
            <i
              style={{ fontSize: " 70px", color: "seagreen" }}
              aria-hidden="true"
            >
              <FontAwesomeIcon icon={faUser} />
            </i>

            <p className="card-title ">
              Name : {props.name + " "}
              {user.isAdmin &&
                (user.isAdmin === 0 ? (
                  <FontAwesomeIcon icon={faCheckDouble} />
                ) : (
                  <FontAwesomeIcon icon={faCheck} />
                ))}
            </p>
            <p className="card-title ">Email : {props.email}</p>
          </div>
          <div className="d-flex justify-content-between ">
            <ul>
              {props.todos.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <li className="row text-right">{"item"}</li>
                  </React.Fragment>
                );
              })}
            </ul>
            <ul>
              {props.done.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <li className="row">{item}</li>
                  </React.Fragment>
                );
              })}
            </ul>
            <ul>
              {props.wip.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <li className="row">{item}</li>
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-between m-2">
          {user.isAdmin !== 0 && isSuperAdmin && (
            <button
              className="btn btn-success"
              onClick={props.onClickHandler}
              value={"admin"}
              name={user.name}
            >
              <b className="p-1">
                <FontAwesomeIcon icon={faUser} />
              </b>
              {user.isAdmin === 1 ? "Remove" : "Admin"}
            </button>
          )}
          {user.isAdmin !== 0 && (isMentor || isSuperAdmin) && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={props.onClickHandler}
              value={"update"}
              name={user.name}
              data-toggle="modal"
              data-target="#exampleModal"
              data-whatever="@mdo"
            >
              <b className="p-1">
                <FontAwesomeIcon icon={faEdit} />
              </b>
              Update
            </button>
          )}
          {user.isAdmin !== 0 && (isMentor || isSuperAdmin) && (
            <button
              className="btn btn-danger"
              onClick={props.onClickHandler}
              value={"delete"}
              name={user.name}
            >
              <b className="p-1">
                <FontAwesomeIcon icon={faTrash} />
              </b>
              Delete
            </button>
          )}
        </div>
      </div>
      <div>
        <div
          className="modal fade"
          id="exampleModal"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title dark" id="exampleModalLabel">
                  Wanna Update the user!
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      value={updatedUser.name}
                      onChange={(e) =>
                        setUpdate({
                          ...updatedUser,
                          name: e.target.value,
                        })
                      }
                      className="form-control"
                      id="recipient-name"
                      placeholder="New Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      value={updatedUser.email}
                      onChange={(e) =>
                        setUpdate({
                          ...updatedUser,
                          email: e.target.value,
                        })
                      }
                      className="form-control"
                      id="message-text"
                      placeholder="New Email"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => props.onSubmit(updatedUser)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
