const moment = require('moment')
const { now } = require('moment')
module.exports = class {
  constructor (config) {
    this._knex = require('knex')(config)
  }

  async getAllOccupiedSlots () {
    const result = await this._knex('occupied_time_slots')
      .withSchema('dbo')
      .select('*')
    return result
  }

  async updateOccupiedTimeSlots (userId, businessId) {

  }

  async isSupportedAddress () {
    const result = await this._knex('supported_addresses')
      .withSchema('dbo')
      .where({
      // supported_address:
      })
      .select('*')
  }

  getOccupiedSlotsForBusiness (occupiedSlots, businessId) {
    return occupiedSlots.filter(
      (slot) => parseInt(slot.business_id) === parseInt(businessId)
    )
  }

  getOccupiedSlotsForDay (occupiedSlots, timeStamp) {
    return occupiedSlots.filter((slot) => {
      const todayDate = moment(new Date().now(), 'ddd MMM Do YYYY, hh:mm:ss ZZ')
      console.log(
        'slot.start_time: ',
        moment(slot.start_time, 'ddd MMM Do YYYY, hh:mm:ss ZZ')
      )
      console.log(
        'slotStartDate: ',
        moment(slotStartDate, 'ddd MMM Do YYYY, hh:mm:ss ZZ')
      )
      const slotStartTime = moment(
        slot.start_time,
        'ddd MMM Do YYYY, hh:mm:ss ZZ'
      )
      console.log(todayDate)
      const slotStartDate = moment(timeStamp).format()
      if (slotStartTime.isSame(slotStartDate, 'day')) return true
      return false
    })
  }

  async isDeliveryValid (timeSlotId, businessId) {
    try {
      const isSlotFree = await this._knex('deliveries')
        .withSchema('dbo')
        .where({ time_slot_id: timeSlotId })
      if (isSlotFree?.length > 2) {
        console.error('the slot already has 2 spots taken')
        return false
      }
      const occupiedSlots = await this.getAllOccupiedSlots()
      const occupiedSlotsForBusiness = this.getOccupiedSlotsForBusiness(
        occupiedSlots,
        businessId
      )

      const dayTimeSlot = await this._knex('occupied_time_slots')
        .withSchema('dbo')
        .where({
          id: timeSlotId
        })
      const dayTimeStamp = dayTimeSlot[0]?.start_time
      const occupiedSlotsForDay = this.getOccupiedSlotsForDay(
        occupiedSlotsForBusiness,
        dayTimeStamp
      )
      if (occupiedSlotsForDay?.length >= 10) {
        console.error(
          'the business can only support up to 10 shippings per day!'
        )
        return false
      } else {
        return true
      }
    } catch (error) {
      console.error(error)
    }
  }

  async bookDelivery (timeSlotId, userId, businessId) {
    return this._knex('deliveries')
      .withSchema('dbo')
      .insert({
        status: 'occupied',
        time_slot_id: timeSlotId,
        user_id: userId,
        business_id: businessId
      })
  }

  async deliveryComplete (id) {
    return this._knex('deliveries')
      .withSchema('dbo')
      .where({ id })
      .update({
        status: 'completed'
      })
  }

  async deliveryCancel (id) {
    return this._knex('deliveries')
      .withSchema('dbo')
      .where({ id })
      .update({
        status: 'canceled'
      })
  }

  async getOccupiedDeliveries (start, end) {
    return this._knex('occupied_time_slots')
      .withSchema('dbo')
      .where('start_time', '>=', start)
      .andWhere('end_time', '<=', end)
      .select('*')
  }
}
