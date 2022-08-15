const moment = require("moment");
module.exports = ({ db }) => {
  return async function (req, res) {
    res.status(200).json(await db.getOccupiedDeliveries(moment().startOf('day'), moment().add(6, 'days').endOf('day')))
  }
}
