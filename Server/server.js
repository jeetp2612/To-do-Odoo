const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.connect((err) => {
  if (err) throw err;
  console.log("connected to PostgreSQL");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/admin", (req, res) => {
  const value = req.body;
  console.log(value.data);
  if (value.task === "admin") {
    let isadmin = false;
    console.log("Admin", value.data.name);
    pool.query(
      `SELECT isadmin FROM todos WHERE name = $1`,
      [value.data.name],
      (err, result) => {
        if (err) throw err;
        isadmin = result.rows[0]?.isadmin === true;

        let sql;
        if (isadmin === false) {
          console.log("not admin");
          sql = `UPDATE todos SET isadmin = TRUE WHERE name = $1`;
        } else {
          sql = `UPDATE todos SET isadmin = NULL WHERE name = $1`;
        }

        pool.query(sql, [value.data.name], (err, result) => {
          if (err) throw err;
          console.log("Done something", result);
          pool.query("SELECT * FROM todos;", (err, result) => {
            if (err) throw err;
            res.send(JSON.stringify(result.rows));
          });
        });
      }
    );
  } else if (value.task === "update") {
    console.log("Update", value.data.preName);
    const sql = `UPDATE todos SET name = $1, email = $2 WHERE name = $3`;
    pool.query(
      sql,
      [value.data.name, value.data.email, value.data.preName],
      (err, result) => {
        if (err) throw err;
        console.log("Done something", result);
        pool.query("SELECT * FROM todos;", (err, result) => {
          if (err) throw err;
          res.send(JSON.stringify(result.rows));
        });
      }
    );
  } else if (value.task === "delete") {
    const sql = `DELETE FROM todos WHERE name = $1`;
    pool.query(sql, [value.data.name], (err, result) => {
      if (err) throw err;
      console.log("Done something", result);
      pool.query("SELECT * FROM todos;", (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result.rows));
      });
    });
  }
});

app.post("/gettodos", (req, res) => {
  const data = req.body;
  console.log("I am here ", data);
  const sql = `SELECT items, wip, done FROM todos WHERE email = $1`;
  pool.query(sql, [data.email], (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result.rows));
  });
});

app.get("/multiuser", (req, res) => {
  const sql = "SELECT * FROM todos;";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result.rows));
  });
});

app.post("/signup", (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO auth (name, email, password) VALUES ($1, $2, $3)`;
  pool.query(sql, [data.name, data.email, data.password], (err, result) => {
    if (err) throw err;
    res.json({ message: "Signup successful!" });
  });
});

app.post("/todo", (req, res) => {
  const data = req.body;
  const sql3 = `SELECT * FROM todos WHERE email = $1`;
  pool.query(sql3, [data.email], (err, result) => {
    if (err) throw err;
    if (result.rows.length == 0) {
      const sql2 = `INSERT INTO todos (email, name, items, done, wip) VALUES ($1, $2, $3, $4, $5)`;
      pool.query(
        sql2,
        [data.email, data.name, data.todos, data.done, data.wip],
        (err, result) => {
          if (err) throw err;
          res.send(JSON.stringify(result));
        }
      );
    } else {
      const sql2 = `UPDATE todos SET items = $1, done = $2, wip = $3 WHERE email = $4`;
      pool.query(
        sql2,
        [data.todos, data.done, data.wip, data.email],
        (err, result) => {
          if (err) throw err;
          res.send(JSON.stringify(result));
        }
      );
    }
  });
});

app.post("/", (req, res) => {
  const { name, password } = req.body;
  const sql = `SELECT name, email, password, isadmin FROM auth WHERE name = $1 AND password = $2`;
  pool.query(sql, [name, password], (err, result) => {
    if (err) throw err;
    if (result.rows.length) {
      return res.json({
        auth: true,
        email: result.rows[0].email,
        name: result.rows[0].name,
        isadmin: result.rows[0].isadmin,
      });
    } else {
      return res.json({ auth: false });
    }
  });
});

app.listen(8003, () => console.log("Server running on port 8003!!"));
