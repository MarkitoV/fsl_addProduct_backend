const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

//connecting to Db
mongoose.connect('mongodb://localhost/clothesStore', { useNewUrlParser: true })
  .then(db => console.log('Db connected'))
  .catch(err => console.log(err));

//import models
const Product = require("./model/product");

//setting
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());

//starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes

//insert product
app.post('/api/product', (req, res) => {
  let data = req.body;
  Product.insertProduct(data, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

//list products
app.get('/api/product', (req, res) => {
  Product.getProducts((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

// delete product by ID
app.delete('/api/product/:id', (req, res) => {
  Product.deleteProduct(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  })
});
