module.exports = ({ db }) => {
  return async function (req, res) {
    res.status(200).json(await db.deliveryComplete(req.params.delivery_id))
  }
}
