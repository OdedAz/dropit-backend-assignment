const axios = require("axios");

module.exports = class addressTransform {
  async getAddress(address) {
    const url = "https://www.geoapify.com/geocoding-api";

    const responseFromApi = async (url, address) => {
      try {
        const response = await axios.get(url, {
          params: { address },
        });
        const { data } = response;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    const transformedAddress = responseFromApi(url, address);
    console.log({ transformedAddress });
  }
};
