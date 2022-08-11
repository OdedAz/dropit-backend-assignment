const router = require("express").Router();
const addressTransformApi = require("../services/addressTransformApi");

const getTransformedAdress = require("../handlers/get_transformed_address");
const getAllTimeslots = require("../handlers/get_time_slots");

module.exports = (addressTransformApi) => {
  router.post("/resolve-address", getTransformedAdress(addressTransformApi));
  // router.post("/timelsots", getAllTimeslots());
  // router.post("/deliveries", );
  // router.post("/deliveries/{DELIVERY_ID}/complete", );
  // router.post("/deliveries/{DELIVERY_ID}", );
  // router.get("/deliveries/daily", );
  // router.get("/deliveries/weekly", );

  return router;
};
