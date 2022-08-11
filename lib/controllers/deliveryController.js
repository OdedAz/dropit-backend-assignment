const router = require("express").Router();

const getAllTimeslots = require("../handlers/get_time_slots");


module.exports = () => {
    // router.get("/auto_complete", search(db,weatherApi));
    // router.delete("/favorite_cities", deleteCityfromFavoritesDB(db));

    router.post("/timelsots", getAllTimeslots());

    return router;
  };