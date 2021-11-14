const db = require("../model/helper"); 

async function sightingMustExist(req, res, next) {
  try {
    const { id } = req.params;
    const results = await db(`SELECT * FROM sightings WHERE id="${id}";`);
    if (!results.data.length) {
      return res.status(404).send({ message: "Sighting not found" });
    }
    next();
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = sightingMustExist;