const express = require("express");
const app = express();
const controller = require("./controller/items.js");
// SERVER_PORT = process.env.SERVER_PORT;
SERVER_PORT = 5000;
require("dotenv").config();

app.use(express.json());
app.get("/", (req, res) => res.send("<h1>Server under construction :)</h1>"));
// app.use("/api/items", controller.items);

app.listen(SERVER_PORT, console.log(`Server running on port ${SERVER_PORT}`));

// How to use dotenv
// How to use MVC
// How to use nodemon and concurrently
