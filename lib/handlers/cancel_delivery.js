module.exports = ({ db }) => {
  return async function (req, res) {
    await db.deliveryCancel(req.params.delivery_id);
    return res.status(200).end();
  };
};
