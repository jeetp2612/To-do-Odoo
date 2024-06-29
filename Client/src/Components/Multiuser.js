import React, { useEffect, useState } from "react";
import Card from "./Card";

const MultiUser = () => {
  const [userData, setUserdata] = useState({});
  const [updateUsername, setUpdateusername] = useState("");

  useEffect(() => {
    fetch("http://localhost:8003/multiuser")
      .then((data) => data.json())
      .then((res) => {
        setUserdata(res);
      });
  }, []);

  function onClickHandler(e) {
    const value = e.target.value;
    const user = e.target.name;

    if (value === "admin") {
      fetch("http://localhost:8003/admin", {
        method: "POST",
        headers: {
          Authorization: "Onkar Birajdar",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          task: "admin",
          data: { name: user },
        }),
      })
        .then((res) => res.json())
        .then((data) => setUserdata(data));
    } else if (value === "delete") {
      fetch("http://localhost:8003/admin", {
        method: "POST",
        headers: {
          Authorization: "Onkar Birajdar",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          task: "delete",
          data: {
            name: user,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => setUserdata(data));
    } else if (value === "update") {
      setUpdateusername(user);
    }
  }

  const onSubmit = (data) => {
    fetch("http://localhost:8003/admin", {
      method: "POST",
      headers: {
        Authorization: "Onkar Birajdar",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        task: "update",
        data: {
          name: data.name,
          email: data.email,
          preName: updateUsername,
          todos: ["todos@here", "sfds"],
          wip: ["todos@here", "sfsd"],
          done: ["todos@here", "sfdsf"],
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => setUserdata(data));
  };

  return (
    <>
      <h1 className="text-center my-3">
        Welcome {sessionStorage.getItem("name")}!!{" "}
      </h1>
      <div className="d-flex flex-wrap m-3 ">
        {Object.entries(userData).map((item, index) => {
          return (
            <Card
              key={index}
              onClickHandler={onClickHandler}
              name={item[1].name}
              email={item[1].email}
              todos={item[1].items.split(",")}
              wip={item[1].wip.split(",")}
              done={item[1].done.split(",")}
              isAdmin={item[1].isadmin}
              onSubmit={onSubmit}
            />
          );
        })}
      </div>
    </>
  );
};

export default MultiUser;
