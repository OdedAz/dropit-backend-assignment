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
      const isAddressSupported = db.isSupportedAddress(addressZipCode);

      if (isAddressSupported) occupiedTimeSlots.find((occupied) => {
        const formattedAvailableStartTime = moment(available.start_time);
        const formattedAvailableEndTime = moment(available.end_time);

        console.log(formattedAddress);
        return (
          occupied.start_time !== formattedAvailableStartTime &&
          occupied.end_time !== formattedAvailableEndTime &&
          occupied.supported_address.include(formattedAddress)
        );
      });
    });

    res.status(200).json(freeTimeSlots);
  };
};
