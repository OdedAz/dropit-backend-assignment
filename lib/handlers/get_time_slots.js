module.exports = (slotsJSON) => {
  return async function (req, res) {
    const availableSlots = slotsJSON.availableTimeSlots;
    console.log(availableSlots)
    const result = "test is ok";
    res.status(200).json(result);
  };
};
