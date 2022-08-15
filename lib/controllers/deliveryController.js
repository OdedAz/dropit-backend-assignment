const router = require('express').Router()
const getTransformedAddress = require('../handlers/get_transformed_address')
const getAllTimeSlots = require('../handlers/get_time_slots')
const bookDelivery = require('../handlers/book_delivery')
const setDeliveryCompleted = require('../handlers/set_delivery_completed')
const cancelDelivery = require('../handlers/cancel_delivery')
const getTodayDeliveries = require('../handlers/get_today_deliveries')
const getWeeklyDeliveries = require('../handlers/get_weekly_deliveries')

module.exports = (common) => {
  router.get('/deliveries/daily', getTodayDeliveries(common))
  router.get('/deliveries/weekly', getWeeklyDeliveries(common))
  router.post('/resolve-address', getTransformedAddress(common))
  router.post('/timeslots', getAllTimeSlots(common))
  router.delete('/deliveries/:delivery_id', cancelDelivery(common))
  router.post('/deliveries/:delivery_id/complete', setDeliveryCompleted(common))
  router.post('/deliveries', bookDelivery(common))

  return router
}
