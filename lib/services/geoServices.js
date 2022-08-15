const axios = require('axios')

module.exports = class GeoServices {
  constructor (config) {
    this._apiKey = config.apiKey
  }

  async getAddress (text) {
    return axios
      .get('https://api.geoapify.com/v1/geocode/autocomplete?REQUEST_PARAMS', {
        params: { text, apiKey: this._apiKey }
      })
      .then(res => res.data.features.map(feature => ({
        country: feature.properties.country,
        street: feature.properties.street,
        line1: feature.properties.address_line1,
        line2: feature.properties.address_line2,
        postcode: feature.properties.postcode
      })))
  }
}
