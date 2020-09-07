// import required node modules
const fs = require("fs");
const path = require("path");
const cors = require("cors");

// install and import express depedency
const express = require("express");
const app = express();

// import and read required files
const listOfItems = fs.readFileSync(
  path.join(__dirname, "./database/itemList.json")
);

// const PORT = process.env.SERVER_PORT;
const PORT = 5000;
require("dotenv").config();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES / CONTROLLERS
app.get("/api", (req, res) =>
  res.send("<h1>Server under construction :)</h1>")
);

app.get("/api/items", (req, res) => res.json(JSON.parse(listOfItems)));

// START SERVER
app.listen(PORT, console.log(`Server running on port ${PORT}`));

// How to use dotenv
// How to use MVC
