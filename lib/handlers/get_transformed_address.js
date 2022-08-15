module.exports = ({ geoServices }) => {
  return async function (req, res) {
    res.status(200).json(await geoServices.getAddress(req.query.address))
  }
}
