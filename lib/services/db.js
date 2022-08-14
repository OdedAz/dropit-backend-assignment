const { response } = require("express");
const dbCredentials = require("./dbCredentials");
const knex = require("knex")(dbCredentials.config);
const moment = require("moment");
const { now } = require("moment");
module.exports = class {
  async getAllOccupiedSlots() {
    try {
      const result = await knex("occupied_time_slots")
        .withSchema("dbo")
        .where({
          status: "occupied",
        })
        .select("*");
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  getOccupiedSlotsForBusiness(occupiedSlots, businessId) {
    return occupiedSlots.filter(
      (slot) => parseInt(slot.business_id) === parseInt(businessId)
    );
  }
  getOccupiedSlotsForDay(occupiedSlots, timeStamp) {
    return occupiedSlots.filter((slot) => {
      const todayDate = moment(new Date(), "ddd MMM Do YYYY, hh:mm:ss ZZ");
      // console.log(
      //   "slot.start_time: ",
      //   moment(slot.start_time, "ddd MMM Do YYYY, hh:mm:ss ZZ")
      // );
      // console.log(
      //   "slotStartDate: ",
      //   moment(slotStartDate, "ddd MMM Do YYYY, hh:mm:ss ZZ")
      // );
      const slotStartTime = moment(
        slot.start_time,
        "ddd MMM Do YYYY, hh:mm:ss ZZ"
      );
      const slotStartDate = moment(timeStamp).format();
      if (slotStartTime.isSame(slotStartDate, "day")) return true;
      return false;
    });
  }
  async isDeliveryValid(timeSlotId, businessId) {
    try {
      const isSlotFree = await knex("deliveries")
        .withSchema("dbo")
        .where({ time_slot_id: timeSlotId });
      if (isSlotFree?.length > 2) {
        console.error("the slot already has 2 spots taken");
        // return false;
      }
      const occupiedSlots = await this.getAllOccupiedSlots();
      const occupiedSlotsForBusiness = this.getOccupiedSlotsForBusiness(
        occupiedSlots,
        businessId
      );

      const dayTimeSlot = await knex("occupied_time_slots")
        .withSchema("dbo")
        .where({
          id: timeSlotId,
        });
      const dayTimeStamp = dayTimeSlot[0]?.start_time
      const occupiedSlotsForDay = this.getOccupiedSlotsForDay(
        occupiedSlotsForBusiness,
        dayTimeStamp
      );
      if (occupiedSlotsForDay?.length >= 10) {
        console.error(
          "the business can only support up to 10 shippings per day!"
        );
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async bookDelivery(timeSlotId) {
    try {
      await knex("deliveries").withSchema("dbo").insert({
        status: "occupied",
        time_slot_id: timeSlotId,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async deliveryComplete(deliveryId) {
    try {
      return await knex("deliveries")
        .withSchema("dbo")
        .where({ id: parseInt(deliveryId) })
        .update({
          status: "completed",
        });
    } catch (error) {
      console.error(error);
    }
  }
  async deliveryCancel(deliveryId) {
    try {
      return await knex("deliveries")
        .withSchema("dbo")
        .where({ id: parseInt(deliveryId) })
        .update({
          status: "canceled",
        });
    } catch (error) {
      console.error(error);
    }
  }
  async getTodayDeliveries() {
    const todayDate = Date.now();
    const occupiedSlots = await this.getAllOccupiedSlots();

    const result = this.getOccupiedSlotsForDay(occupiedSlots, todayDate);
    return result;
  }
};
