const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const deliveryController = require("./controllers/deliveryController");

const port = process.env.port || process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(deliveryController());

app.listen(port, () => {
  console.log(port);
  console.log("server is up !!!" + port);
});
