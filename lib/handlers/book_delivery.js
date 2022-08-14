module.exports = (db, slotsJSON) => {
  return async function (req, res) {
    const { user, timeSlotId, businessId } = req.query;
    const isDeliveryValid = await db.isDeliveryValid(
      user,
      timeSlotId,
      businessId,
      slotsJSON
    );
    if (isDeliveryValid) {
      await db.bookDelivery(timeSlotId);
    }
    res.status(200).json("test is ok");
  };
};
