//variables from dotenv
require("dotenv").config();
const {
  SERVER_PORT,
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  SECRET,
  SECRET_KEY,
} = process.env;

// import required node modules
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const upload = multer({ dest: "/uploads/" });
// const uuid = require("uuid/v4");
// TODO: add a stripe key
// const stripe = require("stripe")(SECRET_KEY);

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

app.patch("/api/items", (req, res) => {
  let itemList = JSON.parse(listOfItems);
  let itemToEdit = itemList.find((item) => item.id == req.body.id);
  itemToEdit.reviews = req.body.comments;
  itemList.splice(itemToEdit.id, 1, itemToEdit);
  fs.writeFileSync(
    path.join(__dirname, "./database/itemList.json"),
    JSON.stringify(itemList)
  );
  res.json(itemList[itemToEdit.id]);
});

app.delete("/api/items", (req, res) => {
  let itemList = JSON.parse(listOfItems);
  console.log(req.body);
  // const itemsAfterDeleting = itemList.filter(
  //   (item) => item.name !== req.body.name
  // );
  // fs.writeFileSync(
  //   path.join(__dirname, "./database/itemList.json"),
  //   JSON.stringify(itemsAfterDeleting)
  // );
  // res.json(`Deleted ${req.body.name}`);
  console.log(`Deleted ${req.body.deleteName}`);
});

app.get("/api", (req, res) => res.send("<h1>Try /api/items </h1>"));

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
    image:
      "https://scontent.fyvr1-1.fna.fbcdn.net/v/t1.0-9/67745950_1198722440306650_3897083973829918720_n.jpg?_nc_cat=104&_nc_sid=9267fe&_nc_ohc=ODbDTV99qzcAX-6Ga2V&_nc_ht=scontent.fyvr1-1.fna&oh=417487ec39cdf14b4b1bf2e32d5e891b&oe=5F8897AD",
    title: req.body.title,
    company: req.body.company,
    description: req.body.description,
    price: req.body.price,
    reviews: req.body.reviews,
  };

  const newItemsArr = JSON.parse(listOfItems).concat(newItem);
  fs.writeFileSync(
    path.join(__dirname, "./database/itemList.json"),
    JSON.stringify(newItemsArr)
  );
});

// add new item with image using MULTER
// app.post('/api/items')

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
