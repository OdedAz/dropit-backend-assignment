const router = require("express").Router();
const getTransformedAddress = require("../handlers/get_transformed_address");
const getAllTimeSlots = require("../handlers/get_time_slots");
const bookDelivery = require("../handlers/book_delivery");

module.exports = (addressTransformApi, slotsJSON, db) => {
  router.post("/resolve-address", getTransformedAddress(addressTransformApi));
  router.post("/timelsots", getAllTimeSlots(db, slotsJSON));
  router.post("/delivery", bookDelivery(db, slotsJSON));
  // router.post("/deliveries/{DELIVERY_ID}/complete", );
  // router.post("/deliveries/{DELIVERY_ID}", );
  // router.get("/deliveries/daily", );
  // router.get("/deliveries/weekly", );

  return router;
};
