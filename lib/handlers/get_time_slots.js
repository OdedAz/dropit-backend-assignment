const moment = require("moment");

module.exports = ({ db, courierAPI }) => {
  return async function (req, res) {
    // TODO: add parameter from request for formatted address
    const addressZipCode = req.query.address;
    const availableSlots = courierAPI.getAll();
    const occupiedTimeSlots = await db.getAllOccupiedSlots();

    if (!occupiedTimeSlots.length) {
      return res.status(200).json(availableSlots);
    }
    const freeTimeSlots = availableSlots.filter((available) => {
      const isAddressSupported =
        available.supported_addresses.includes(addressZipCode);

      if (isAddressSupported) {
        isFreeSlot = occupiedTimeSlots.find((occupied) => {
          const formattedAvailableStartTime = moment(available.start_time);
          const formattedAvailableEndTime = moment(available.end_time);
          console.log("1: ", formattedAvailableStartTime <= moment(occupied.start_time))
          console.log("2: ", formattedAvailableEndTime <= moment(occupied.end_time))
          console.log("1-: ", (formattedAvailableStartTime >= moment(occupied.start_time)))
          console.log("2-: ", formattedAvailableEndTime >= moment(occupied.end_time))
          return (
            (formattedAvailableStartTime <= moment(occupied.start_time) &&
              formattedAvailableEndTime <= moment(occupied.end_time)) ||
            (formattedAvailableStartTime >= moment(occupied.start_time) &&
              formattedAvailableEndTime >= moment(occupied.end_time))
          );
        });
        if (isFreeSlot) return available;
      }
    });
    res.status(200).json(freeTimeSlots);
  };
};

// console.log(
//   "1: ",
//   moment(occupied.start_time) <= formattedAvailableStartTime
// );
// console.log(
//   "2: ",
//   moment(occupied.end_time) <= formattedAvailableStartTime
// );
