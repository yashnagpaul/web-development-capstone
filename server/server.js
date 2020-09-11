// import required node modules
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// install and import express depedency
const express = require("express");
const app = express();

//variables from dotenv
require("dotenv").config();
const { SERVER_PORT, ADMIN_USERNAME, ADMIN_PASSWORD, SECRET } = process.env;

// import and read required files
const listOfItems = fs.readFileSync(
  path.join(__dirname, "./database/itemList.json")
);

// ========== * ==========  * MIDDLEWARE * ========== * ==========

app.use(express.json());
app.use(cors());

// ========== * ========== * ROUTES * ========== * ==========

app.get("/api", (req, res) =>
  res.send("<h1>Server under construction :)</h1>")
);

// get all items
app.get("/api/items", (req, res) => res.json(JSON.parse(listOfItems)));

// login
app.get("/api/login", (req, res) => {
  if (
    req.body.username === ADMIN_USERNAME &&
    req.body.pass === ADMIN_PASSWORD
  ) {
    console.log(req.body);
    const token = jwt.sign(req.headers, SECRET);
    res.json({ status: 200, token });
  } else {
    res.json("Hmmm...");
    console.log(ADMIN_USERNAME, ADMIN_PASSWORD);
    console.log(req.body);
  }
});

// add new item
app.post("/api/items", (req, res) => {
  const newItem = {
    id: JSON.parse(listOfItems).length,
    image: req.body.image,
    title: req.body.title,
    company: req.body.company,
    description: req.body.description,
    price: req.body.price,
  };
  const newItemsArr = JSON.parse(listOfItems).concat(newItem);
  fs.writeFileSync(
    path.join(__dirname, "./database/itemList.json"),
    JSON.stringify(newItemsArr)
  );
});

// ========== * ========== * RUN THE SERVER * ========== * ==========

app.listen(SERVER_PORT, console.log(`Server running on port ${SERVER_PORT}`));
