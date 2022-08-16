const express = require('express')
require('express-async-errors')
const logger = require('pino')()
const cors = require('cors')
const bodyParser = require('body-parser')
const deliveryController = require('./lib/controllers/deliveryController')
const GeoServices = require('./lib/services/geoServices')
const DB = require('./lib/services/db')
const CourierApi = require('./lib/services/CourierApi')

const config = require('./lib/services/config')
const port = process.env.port || process.env.PORT || 3000

async function main () {
  const common = {
    db: new DB(config.db),
    geoServices: new GeoServices(config.geo),
    courierAPI: new CourierApi()
  }

  const app = express()

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cors())

  app.use(deliveryController(common))

  app.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).end()
  })

  app.listen(port, () => console.log('server is up, listening on port: ' + port))
}

main()
