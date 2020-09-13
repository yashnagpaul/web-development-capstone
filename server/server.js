//variables from dotenv
require("dotenv").config();
const {
  SERVER_PORT,
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  SECRET,
  PUBLISHABLE_KEY,
} = process.env;

// import required node modules
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
// const uuid = require("uuid/v4");
// TODO: add a stripe key
// const stripe = require("stripe")(PUBLISHABLE_KEY);

// install and import express depedency
const express = require("express");
const app = express();

// import and read required files
const listOfItems = fs.readFileSync(
  path.join(__dirname, "./database/itemList.json")
);

// ========== * ========== * MIDDLEWARE * ========== * ==========

app.use(express.json());
app.use(cors());

// ========== * ========== * ROUTES * ========== * ==========

app.get("/api", (req, res) =>
  res.send("<h1>Server under construction :)</h1>")
);

// get all items
app.get("/api/items", (req, res) => res.json(JSON.parse(listOfItems)));

// login
app.post("/api/login", (req, res) => {
  console.log(req.body);
  if (
    req.body.username === ADMIN_USERNAME &&
    req.body.pass === ADMIN_PASSWORD
  ) {
    console.log(req.body);
    const token = jwt.sign({ username: req.body.username }, SECRET);
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

app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("product", product);
  console.log("price", product.price);
  const idempontencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "cad",
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch(console.log(error));
});

// ========== * ========== * RUN THE SERVER * ========== * ==========

app.listen(SERVER_PORT, console.log(`Server running on port ${SERVER_PORT}`));
