const moment = require("moment");

module.exports = ({ db, courierAPI }) => {
  return async function (req, res) {
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
        const freeSlot = occupiedTimeSlots.find((occupied) => {
          const formattedAvailableStartTime = moment(available.start_time);
          const formattedAvailableEndTime = moment(available.end_time);

          return (
            (formattedAvailableStartTime <= moment(occupied.start_time) &&
              formattedAvailableEndTime <= moment(occupied.end_time)) ||
            (formattedAvailableStartTime >= moment(occupied.start_time) &&
              formattedAvailableEndTime >= moment(occupied.end_time))
          );
        });
        return !!freeSlot;
      }
      return false;
    });
    res.status(200).json(freeTimeSlots);
  };
};
