import React, { useEffect, useState } from "react";
import List from "./List";
import "./Todo.css";

const Todo = () => {
  const [data, changedata] = useState("");
  const [serData, setSerdata] = useState({
    items: "",
    wip: "",
    done: "",
  });
  const [user, changeUser] = useState({
    name: sessionStorage.getItem("name"),
    email: sessionStorage.getItem("email"),
  });

  const [todolist, changetodo] = useState([]);
  const [wip, changeWip] = useState([]);
  const [done, changeDone] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8003/gettodos", {
      method: "POST",
      headers: {
        Authorization: "Onkar Birajdar",
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: user.name, email: user.email }),
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        setSerdata({
          items: res[0].items.split(","),
          wip: res[0].wip.split(","),
          done: res[0].done.split(","),
        });
      });
  }, [user]);

  useEffect(() => {
    changetodo([...serData.items]);
    changeWip([...serData.wip]);
    changeDone([...serData.done]);
  }, [serData]);

  const onChangeHandler = (e) => {
    changedata(e.target.value);
  };

  const onDeleteHandler = (index) => {
    const deleteTask = [...todolist];
    const temp = deleteTask.splice(index, 1);
    changeDone([...done, ...temp]);
    changetodo([...deleteTask]);
  };

  const onEditHandler = (index) => {
    const val = prompt();
    const editTask = [...todolist];
    editTask.splice(index, 1, val);
    changetodo([...editTask]);
  };

  const onEditHandler1 = (index) => {
    const val = prompt();
    const editTask = [...wip];
    editTask.splice(index, 1, val);
    changeWip([...editTask]);
  };

  const onNameChange = (e) => {
    e.target.name === "name"
      ? changeUser({ ...user, name: e.target.value })
      : changeUser({ ...user, email: e.target.value });
  };

  const Save = (e) => {
    e.preventDefault();
    console.log(todolist);
    fetch("http://localhost:8003/todo", {
      method: "POST",
      headers: {
        Authorization: "Onkar Birajdar",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        todos: todolist.toLocaleString(),
        done: done.toLocaleString(),
        wip: wip.toLocaleString(),
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const onFormHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (data === "") {
      // alert('please enter the task')
    } else if (todolist.includes(data)) {
      // alert("you have alredy entered the task")
    } else {
      changedata("");
      changetodo([...todolist, data]);
    }
  };
  const onDeleteHandler1 = (index) => {
    const deleteTask = [...wip];
    const temp = deleteTask.splice(index, 1);
    changeDone([...done, ...temp]);
    changeWip([...deleteTask]);
  };
  const onUndoHandler = (index) => {
    const deleteTask = [...done];
    const temp = deleteTask.splice(index, 1);
    changeDone([...deleteTask]);
    changetodo([...todolist, ...temp]);
  };
  const onWipHandler = (index) => {
    const deleteTask = [...todolist];
    const temp = deleteTask.splice(index, 1);
    changeWip([...wip, ...temp]);
    changetodo([...deleteTask]);
  };

  return (
    <>
      <div
        className="card text-dark bg-light mb-3"
        style={{
          maxWidth: "80rem",
          marginLeft: "130px",
          marginTop: "150px",
        }}
      >
        <h5 className=" card1 px-3 py-2">
          {/* <form onSubmit={onSubmitUser}> */}
          <label>
            Name
            <input
              style={{ width: "25rem", fontFamily: "monospace" }}
              className="px-2 py-1 m-2"
              onChange={onNameChange}
              name="name"
              type="text"
              placeholder="name"
              value={user.name}
            ></input>
          </label>
          <label>
            Email
            <input
              style={{ width: "25rem", fontFamily: "monospace" }}
              className="px-2 py-1 m-2"
              onChange={onNameChange}
              name="email"
              type="email"
              placeholder="email"
              value={user.email}
              required
            ></input>
          </label>
        </h5>
        <div className="card-body">
          <div>
            <form>
              <input
                style={{
                  width: "91%",
                  fontFamily: "monospace",
                }}
                className="py-2 px-3 ml-3 "
                type="text"
                id="main"
                value={data}
                placeholder="What u are gonna do today!!"
                onChange={onChangeHandler}
                required
              ></input>
              &nbsp;
              <span>
                <button
                  className="button display-6 py-2 px-3"
                  onClick={onFormHandler}
                >
                  +
                </button>
              </span>
            </form>

            <div className="d-flex justify-content-between m-2">
              <div className="card border-2 p-2 mx-2" style={{ width: "47%" }}>
                <h5 className="text-center"> Todo</h5>

                <List
                  editTask={onEditHandler}
                  deleteTask={onDeleteHandler}
                  wipTask={onWipHandler}
                  items={todolist}
                  name="todo"
                />
              </div>
              <div className="card rounded p-2 mx-2" style={{ width: "47%" }}>
                <h5 className="text-center"> Work in progress</h5>

                <List
                  items={wip}
                  editTask1={onEditHandler1}
                  deleteTask1={onDeleteHandler1}
                  name="wip"
                />
              </div>

              <div className="card rounded p-2 mx-2" style={{ width: "47%" }}>
                <h5 className="text-center"> Done</h5>

                <List items={done} name="done" undoTask={onUndoHandler} />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="button display-6 border rounded"
                style={{ fontSize: "24px" }}
                onClick={Save}
              >
                save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
