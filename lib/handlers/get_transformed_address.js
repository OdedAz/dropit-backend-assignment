module.exports = (addressTransformApi) => {
  return async function (req, res) {
    const stringAddress = req.query.address;
    const transformedAddress = addressTransformApi.getAddress(stringAddress);
    console.log({transformedAddress})
    const result = "test is ok";
    res.status(200).json(result);
  };
};
