module.exports = () => {
  return async function (req, res) {
    const result = "test is ok";
    res.status(200).json(result);
  };
};
