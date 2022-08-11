const { response } = require("express");

const knex = require("knex")({
  client: "mssql",
  connection: {
    host: "127.0.0.1",
    port: 1433,
    user: "oded",
    password: "Oded123#",
    database: "deliveryApp",
  },
});

module.exports = class {
//   async addCityToFavoritesDB({ id, localizedName }) {
//     try {
//       await knex("favorite_cities").insert({
//         id: parseInt(id),
//         localized_name: localizedName,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }
};
