module.exports = (db, weatherApi) => {
    return async function (req, res) {
      const result = "test is ok"
      res.status(200).json(result);
    };
  };