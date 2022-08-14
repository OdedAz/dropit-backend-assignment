const router = require("express").Router();
const getTransformedAddress = require("../handlers/get_transformed_address");
const getAllTimeSlots = require("../handlers/get_time_slots");
const bookDelivery = require("../handlers/book_delivery");
const deliveryIsComplete = require("../handlers/delivery_is_complete");
const deliveryIsCancel = require("../handlers/delivery_is_cancel");

module.exports = (addressTransformApi, slotsJSON, db) => {
  router.post("/resolve-address", getTransformedAddress(addressTransformApi));
  router.post("/timelsots", getAllTimeSlots(db, slotsJSON));
  router.post("/deliveries/:delivery_id/complete", deliveryIsComplete(db));
  router.post("/deliveries/:delivery_id", deliveryIsCancel(db));
  router.post("/delivery", bookDelivery(db, slotsJSON));
  // router.get("/deliveries/daily", );
  // router.get("/deliveries/weekly", );

  return router;
};
