const moment = require("moment");
const availableTimeSlots = require("../data/availableTimeSlots.json");

module.exports = class CourierAPI {
  constructor() {
    this.load();
  }

  getAll() {
    return this._array;
  }

  load() {
    this._array = availableTimeSlots.map((p) => ({
      id: p.id,
      start_time: moment(p.start_time),
      end_time: moment(p.end_time),
      supported_addresses: p.supported_addresses,
    }));
  }
};
