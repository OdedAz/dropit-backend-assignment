module.exports = (db) => {
  return async function (req, res) {
    try {
      const deliveryId = req.params.delivery_id;
      const result = await db.deliveryComplete(deliveryId);
      result ? res.status(200).json(result) : res.status(400).json("error message");
    } catch (error) {
      console.error(error);
    }
  };
};
