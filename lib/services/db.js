const moment = require("moment");
module.exports = class {
  constructor(config) {
    this._knex = require("knex")(config);
  }

  async getAllOccupiedSlots() {
    return this._knex("occupied_time_slots").withSchema("dbo").select("*");
  }

  getOccupiedSlotsForBusiness(occupiedSlots, businessId) {
    return occupiedSlots.filter(
      (slot) => parseInt(slot.business_id) === parseInt(businessId)
    );
  }

  getOccupiedSlotsForDay(occupiedSlots, timeStamp) {
    return occupiedSlots.filter((slot) =>
      moment(slot).isSame(moment(timeStamp), "day")
    );
  }

  async isDeliveryValid(timeSlotId, businessId) {
    const isSlotFree = await this._knex("deliveries")
      .withSchema("dbo")
      .where({ time_slot_id: timeSlotId });
    if (isSlotFree?.length > 2) {
      console.error("the slot already has 2 spots taken");
      return false;
    }
    const occupiedSlots = await this.getAllOccupiedSlots();
    const occupiedSlotsForBusiness = this.getOccupiedSlotsForBusiness(
      occupiedSlots,
      businessId
    );

    const dayTimeSlot = await this._knex("occupied_time_slots")
      .withSchema("dbo")
      .where({
        id: timeSlotId,
      });
    const dayTimeStamp = dayTimeSlot[0]?.start_time;
    const occupiedSlotsForDay = this.getOccupiedSlotsForDay(
      occupiedSlotsForBusiness,
      dayTimeStamp
    );
    return occupiedSlotsForDay?.length < 10;
  }

  async bookDelivery(courierAPI, timeSlotId, userId, businessId) {
    const json = courierAPI.getAll();
    const timeSlotToAdd = json.filter((timeSlot) => timeSlot.id === timeSlotId);

    this._knex
      .transaction(async function (trx) {
        const DBtimeSlotId = await trx("occupied_time_slots")
          .withSchema("dbo")
          .insert({
            start_time: timeSlotToAdd[0].start_time,
            end_time: timeSlotToAdd[0].end_time,
          })
          .returning("id");
        await trx("deliveries").withSchema("dbo").insert({
          status: "occupied",
          time_slot_id: DBtimeSlotId[0].id,
          user_id: userId,
          business_id: businessId,
        });
      })
      .then(function (inserts) {
        console.log(" delivery is booked & occupied slots is updated.");
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async deliveryComplete(id) {
    return this._knex("deliveries").withSchema("dbo").where({ id }).update({
      status: "completed",
    });
  }

  async deliveryCancel(id) {
    return this._knex("deliveries").withSchema("dbo").where({ id }).update({
      status: "canceled",
    });
  }

  async getOccupiedDeliveries(start, end) {
    return this._knex("occupied_time_slots")
      .withSchema("dbo")
      .where("start_time", ">=", start)
      .andWhere("end_time", "<=", end)
      .select("*");
  }
};
