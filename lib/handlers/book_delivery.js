module.exports = ({ db, courierAPI }) => {
  return async function (req, res) {
    const { timeSlotId, businessId, userId } = req.query;
    const isDeliveryValid = await db.isDeliveryValid(timeSlotId, businessId);
    if (isDeliveryValid) {
      await db.bookDelivery(courierAPI, timeSlotId, userId, businessId);
      res.status(200).json("delivery was booked!");
    } else {
      res.status(400).json("there was an error!");
    }
  };
};
