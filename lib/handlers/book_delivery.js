module.exports = ({ db, courierAPI }) => {
  return async function (req, res) {
    try {
      const { timeSlotId, businessId, userId } = req.query
      const isDeliveryValid = await db.isDeliveryValid(timeSlotId, businessId)
      if (isDeliveryValid) {
        await db.bookDelivery(timeSlotId, userId, businessId)
        res.status(200).json('delivery was booked!')
      } else {
        res.status(400).json('there was an error!')
      }
    } catch (error) {
      console.error(error)
    }
  }
}
