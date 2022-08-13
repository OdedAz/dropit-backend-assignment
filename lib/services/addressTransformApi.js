const axios = require("axios");
const { apiKey } = require("../services/geoapifyApiCredentials");
module.exports = class addressTransform {
  async getAddress(address) {
    const url =
      "https://api.geoapify.com/v1/geocode/autocomplete?REQUEST_PARAMS";

    const responseFromApi = async (url, address) => {
      try {
        const response = await axios.get(url, {
          params: { text: address, apiKey },
        });
        const { data } = response;
        const addressesArray = data?.features;
        const mappedResult = addressesArray.map((data) => {
          const address = data.properties;
          return {
            country: address.country,
            street: address.street,
            line1: address.address_line1,
            line2: address.address_line2,
            postcode: address.postcode
          };
        });
        return mappedResult;
      } catch (error) {
        console.error(error);
      }
    };
    const transformedAddress = await responseFromApi(url, address);
    return transformedAddress;
  }
};
