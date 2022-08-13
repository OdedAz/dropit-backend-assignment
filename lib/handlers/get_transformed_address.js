module.exports = (addressTransformApi) => {
  return async function (req, res) {
    const stringAddress = req.query.address;
    const transformedAddress = await addressTransformApi.getAddress(stringAddress);
    res.status(200).json(transformedAddress);
  };
};
