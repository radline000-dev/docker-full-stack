// Common Module Import
const express = require("express");
const bodyParser = require("body-parser");
const colors = require("colors");

//Database pool Import
const db = require("./db");

//Express Server Create
const app = express();

//json 형태로 오는 요청의 본문을 해석할 수 있게 적용
app.use(bodyParser.json());

// List Table Create
// db.pool.query(
//   `CREATE TABLE lists (
//   id INTEGER AUTO INCREMENT,
//   value TEXT,
//   PRIMARY KEY (id)
// );`,
//   (err, results, fileds) => {
//     console.log("results", results);
//   }
// );

// @desc    Get all lists
// @route   GET /api/values
// @access  Public
app.get("/api/values", (req, res, next) => {
  db.pool.query("SELECT * FORM lists;", (err, results, fileds) => {
    if (err) return res.status(500).send(err);
    else return res.status(200).json(results);
  });
});

// @desc    Create list values
// @route   POST /api/value
// @access  Public
app.post("/api/value", (req, res, next) => {
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, results, fileds) => {
      if (err) return res.status(500).send(err);
      else
        return res.status(201).json({ success: true, value: req.body.value });
    }
  );
});
//Server Open
app.listen(5000, () => {
  console.log("애플리케이션이 5000번 포트에서 시작되었습니다.".bold.blue);
});
