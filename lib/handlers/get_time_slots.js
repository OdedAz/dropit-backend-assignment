const moment = require("moment");

module.exports = (db, slotsJSON) => {
  return async function (req, res) {
    const availableSlots = slotsJSON.availableTimeSlots;
    const occupiedTimeSlots = await db.getAllOccupiedSlots();
    if (occupiedTimeSlots.length > 0) {
      const freeTimeSlots = availableSlots.filter((available) => {
        const result = occupiedTimeSlots.find((occupied) => {
          const formattedAvailableStartTime = moment(
            available.start_time
          ).unix();
          const formattedAvailableEndTime = moment(available.end_time).unix();
          if (
            parseInt(occupied.start_time) !== formattedAvailableStartTime &&
            parseInt(occupied.end_time) !== formattedAvailableEndTime
          ) {
            return available;
          }
        });
        return result;
      });
      res.status(200).json(freeTimeSlots);
    } else {
      res.status(200).json(availableSlots);
    }
  };
};
