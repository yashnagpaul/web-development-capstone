//variables from dotenv
require('dotenv').config();
const {
  SERVER_PORT,
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  SECRET,
  SECRET_KEY,
  MIXPANEL_TOKEN,
} = process.env;

// import required node modules
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init(MIXPANEL_TOKEN);

// TODO: add a stripe key
// const stripe = require("stripe")(SECRET_KEY);

// install and import express depedency
const express = require('express');
const app = express();

// MULTER
const multer = require('multer');

// import and read required files
const listOfItems = fs.readFileSync(
  path.join(__dirname, './database/itemList.json')
);

// ========== * ========== * MIDDLEWARE * ========== * ==========

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.static(__dirname + '/public'));
app.use('*/uploads', express.static('public/images'));

// ========== * ========== * ROUTES * ========== * ==========

const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const upload = multer();

app.post('/api/items', upload.single('file'), async function (req, res, next) {
  const {
    file,
    body: { name, company, description, price },
    // body: { company },
    // body: { description },
    // body: { price },
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
    price: parseInt(price),
    reviews: [],
  };

  const newItemsArr = JSON.parse(listOfItems).concat(newItem);
  fs.writeFileSync(
    path.join(__dirname, './database/itemList.json'),
    JSON.stringify(newItemsArr)
  );

  res.send('Item uploaded');
});

//

app.patch('/api/items', (req, res) => {
  let itemList = JSON.parse(listOfItems);
  let itemToEdit = itemList.find((item) => item.id == req.body.id);
  itemToEdit.reviews = req.body.comments;
  itemList.splice(itemToEdit.id, 1, itemToEdit);
  fs.writeFileSync(
    path.join(__dirname, './database/itemList.json'),
    JSON.stringify(itemList)
  );
  res.json(itemList[itemToEdit.id]);
});

app.delete('/api/items/:id', (req, res) => {
  let itemList = JSON.parse(listOfItems);
  const itemsAfterDeleting = itemList.filter(
    (item) => item.id != req.params.id
  );
  fs.writeFileSync(
    path.join(__dirname, './database/itemList.json'),
    JSON.stringify(itemsAfterDeleting)
  );
  res.json(`Deleted ${req.params.id}`);
});

app.get('/api', (req, res) => res.send('<h1>Try /api/items </h1>'));

// get all items
app.get('/api/items', (req, res) => res.json(JSON.parse(listOfItems)));

// login
app.post('/api/login', (req, res) => {
  console.log(req.body);
  if (
    req.body.username === ADMIN_USERNAME &&
    req.body.pass === ADMIN_PASSWORD
  ) {
    console.log(req.body);
    const token = jwt.sign({ username: req.body.username }, SECRET);

    mixpanel.track('Admin login', {
      distinct_id: req.body.username,
      user: req.body.username,
    });

    res.json({ status: 200, username: req.body.username, token });
  } else {
    res.json('Hmmm...');
    console.log(ADMIN_USERNAME, ADMIN_PASSWORD);
    console.log(req.body);
  }
});

app.post('/payment', (req, res) => {
  const { product, token } = req.body;
  console.log('product', product);
  console.log('price', product.price);
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
          currency: 'cad',
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
