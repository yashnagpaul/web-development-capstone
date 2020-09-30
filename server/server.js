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

// TODO: add a stripe key
// const stripe = require("stripe")(SECRET_KEY);

// install and import express depedency
const express = require("express");
const app = express();

// MULTER
const multer = require("multer");

// import and read required files
const listOfItems = fs.readFileSync(
  path.join(__dirname, "./database/itemList.json")
);

// ========== * ========== * MIDDLEWARE * ========== * ==========

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// ========== * ========== * ROUTES * ========== * ==========

const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const upload = multer();

app.post("/api/items", upload.single("file"), async function (req, res, next) {
  const {
    file,
    body: { name, company, description, price }, // TODO: when creating newItem, solve this issue
  } = req;

  // if (file.detectedFileExtention != ".jpg")
  //   next(new Error("Invalid file type!"));

  const ext = file.detectedFileExtension;
  const fileName = name + ext;
  await pipeline(
    file.stream,
    fs.createWriteStream(`${__dirname}/public/uploads/${fileName}`)
  );

  // TODO: solve issue at line 46

  const newItem = {
    id: JSON.parse(listOfItems).length,
    image: `http://localhost:5000/uploads/${fileName}`,
    title: name,
    company: company,
    description: description,
    price: price,
    reviews: [],
  };

  const newItemsArr = JSON.parse(listOfItems).concat(newItem);
  fs.writeFileSync(
    path.join(__dirname, "./database/itemList.json"),
    JSON.stringify(newItemsArr)
  );

  res.send("Item uploaded");
});

//

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

app.delete("/api/items/:id", (req, res) => {
  let itemList = JSON.parse(listOfItems);
  const itemsAfterDeleting = itemList.filter(
    (item) => item.id != req.params.id
  );
  fs.writeFileSync(
    path.join(__dirname, "./database/itemList.json"),
    JSON.stringify(itemsAfterDeleting)
  );
  res.json(`Deleted ${req.params.id}`);
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
