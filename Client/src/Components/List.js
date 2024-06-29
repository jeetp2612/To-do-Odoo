import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSpinner,
  faUndo,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const List = (props) => {
  const toggleClass = useRef(null);

  const [togleStyle, setTogleStyle] = useState({
    fontSize: "16px",
    whiteSpace: "nowrap",
    maxWidth: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  });

  function toggle() {
    setTogleStyle({ fontSize: "16px" });
  }

  return (
    <div>
      <ul>
        {props.items &&
          props.items.map((item, index) => (
            <React.Fragment key={index}>
              <li className="my-1">
                <div className="d-flex justify-content-between">
                  <p
                    ref={toggleClass}
                    onClick={toggle}
                    style={togleStyle}
                    className="text-left "
                  >
                    {item}
                  </p>
                  {props.name == "todo" && (
                    <span className="margin d-inline-block float-right">
                      <FontAwesomeIcon
                        onClick={props.editTask.bind(null, index)}
                        icon={faEdit}
                        className="btn text-white btn-info justify-content-center mx-1"
                        style={{ fontSize: "10px" }}
                      />

                      <FontAwesomeIcon
                        icon={faCheck}
                        onClick={props.deleteTask.bind(null, index)}
                        className="btn text-white btn-danger justify-content-center mx-1 "
                        style={{ fontSize: "10px" }}
                      />
                      <FontAwesomeIcon
                        icon={faSpinner}
                        onClick={props.wipTask.bind(null, index)}
                        className="btn text-white btn-danger justify-content-center mx-1 "
                        style={{ fontSize: "10px" }}
                      />
                    </span>
                  )}
                  {props.name == "wip" && (
                    <span className="margin d-inline-block float-right">
                      <FontAwesomeIcon
                        onClick={props.editTask1.bind(null, index)}
                        icon={faEdit}
                        className="btn text-white btn-info justify-content-center"
                        style={{ fontSize: "10px" }}
                      />

                      <FontAwesomeIcon
                        icon={faCheck}
                        onClick={props.deleteTask1.bind(null, index)}
                        className="btn text-white btn-danger justify-content-center mx-1 "
                        style={{ fontSize: "10px" }}
                      />
                    </span>
                  )}
                  {props.name == "done" && (
                    <span className="margin d-inline-block float-right">
                      <FontAwesomeIcon
                        icon={faUndo}
                        onClick={props.undoTask.bind(null, index)}
                        className="btn text-white btn-info justify-content-center"
                        style={{ fontSize: "10px" }}
                      />
                    </span>
                  )}
                </div>
              </li>
            </React.Fragment>
          ))}
      </ul>
    </div>
  );
};

export default List;
