const { response } = require("express");
const dbCredentials = require("./dbCredentials");
const knex = require("knex")(dbCredentials.config);
const moment = require("moment");
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
  async isDeliveryValid(user, timeSlotId, businessId, slotsJSON) {
    try {
      const isSlotFree = await knex("deliveries")
        .withSchema("dbo")
        .where({ time_slot_id: timeSlotId });
      if (isSlotFree?.length > 2) {
        console.error("the slot already has 2 spots taken");
        return false;
      }
      const occupiedSlots = await this.getAllOccupiedSlots();
      const occupiedSlotsForBusiness = occupiedSlots.filter(
        (slot) => parseInt(slot.business_id) === parseInt(businessId)
      );
      const occupiedSlotsForDay = occupiedSlotsForBusiness.filter((slot) => {
        const slotStartTimeStamp = moment(
          "Sun Aug 14 2022 11:20:42 GMT+0300 (Israel Daylight Time)",
          "ddd MMM Do YYYY, hh:mm:ss ZZ"
        );
        const slotStartDate = moment(
          "Sun Aug 14 2022 11:20:42 GMT+0300 (Israel Daylight Time)",
          "ddd MMM Do YYYY, hh:mm:ss ZZ"
        );
        if (slotStartTimeStamp.isSame(slotStartDate, "day")) return true;
        return false;
      });
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
};
