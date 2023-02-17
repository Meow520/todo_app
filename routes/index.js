const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "${password}",
  database: "todo_app",
});

/* GET home page. */
router.get("/", async (req, res, next) => {
  const q_get = `select * from todos;`;
  con.query(q_get, (error, results) => {
    if (error) {
      console.log("error:", error);
    }
    console.log(results);
    res.render("index", {
      title: "Todo App",
      todos: results,
    });
  });
});

router.post("/", async (req, res, next) => {
  con.connect((err) => {
    if (err) throw err;
    console.log("success");
  });

  const todo = await req.body.add;
  const q_post = `insert into todos (name) values ('${todo}');`;
  con.query(q_post, (error, results) => {
    if (error) {
      console.log("error:", error);
    }
    res.redirect("/");
    console.log(todo);
  });
});

router.post("/done", async (req, res, next) => {
  con.connect((err) => {
    if (err) throw err;
    console.log("success");
  });

  const id = await req.body.id;
  const q_post = `update todos set done=1 where id=${id} limit 1;`;
  con.query(q_post, (error, results) => {
    if (error) {
      console.log("error:", error);
    }
    res.redirect("/");
    console.log(id);
  });
});

router.post("/delete", async (req, res, next) => {
  con.connect((err) => {
    if (err) throw err;
    console.log("success");
  });

  const id = await req.body.id;
  const q_post = `delete from todos where id=${id} limit 1;`;
  con.query(q_post, (error, results) => {
    if (error) {
      console.log("error:", error);
    }
    res.redirect("/");
    console.log(id);
  });
});

module.exports = router;
