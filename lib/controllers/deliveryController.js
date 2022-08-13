const router = require("express").Router();
const getTransformedAddress = require("../handlers/get_transformed_address");
const getAllTimeSlots = require("../handlers/get_time_slots");

module.exports = (addressTransformApi, slotsJSON) => {
  router.post("/resolve-address", getTransformedAddress(addressTransformApi));
  router.post("/timelsots", getAllTimeSlots(slotsJSON));
  // router.post("/deliveries", );
  // router.post("/deliveries/{DELIVERY_ID}/complete", );
  // router.post("/deliveries/{DELIVERY_ID}", );
  // router.get("/deliveries/daily", );
  // router.get("/deliveries/weekly", );

  return router;
};
