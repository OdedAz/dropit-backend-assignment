module.exports = (db, slotsJSON) => {
  return async function (req, res) {
    try {
      const { timeSlotId, businessId } = req.query;
      const isDeliveryValid = await db.isDeliveryValid(timeSlotId, businessId);
      if (isDeliveryValid) {
        await db.bookDelivery(timeSlotId);
        res.status(200).json("delivery was booked!");
      } else {
        res.status(400).json("there was an error!");
      }
    } catch (error) {
      console.error(error);
    }
  };
};
