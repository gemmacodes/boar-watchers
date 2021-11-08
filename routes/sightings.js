var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET sightings listing. */
router.get('/', async function(req, res, next) {
  try{
    const results = await db("SELECT * FROM sightings;")
    res.send(results.data);
  }
  catch(err){
    res.status(500).send(err);
  }
});

/* GET one sighting. */
router.get('/:id', async function(req, res, next) {
  try{
    const { id } = req.params;
    const results = await db(`SELECT * FROM sightings WHERE id="${id}";`);
    res.send(results.data);
  }
  catch(err){
    res.status(500).send(err);
  }
});

// CREATE new sighting
router.post("/", async function(req, res, next) {
  try {
    const { timestamp, latitude, longitude, adults, piglets, humanInteraction, comments } = req.body
    await db(
      `INSERT INTO sightings (timestamp, latitude, longitude, adults, piglets, humanInteraction, comments) VALUES ("${timestamp}", "${latitude}", "${longitude}", "${adults}", "${piglets}", "${humanInteraction}", "${comments}");` 
    );
    res.status(201).send("New sighting has been added correctly!"); 
  } catch (err) {
    res.status(500).send(err);
  }
});

// MODIFY sighting information
router.put("/:id", async function(req, res, next) {
  try {
    const { id } = req.params;
    const { timestamp, latitude, longitude, adults, piglets, humanInteraction, comments } = req.body
    const results = await db(
      `UPDATE sightings SET (timestamp = "${timestamp}", latitude = "${latitude}", longitude = "${longitude}", adults = "${adults}", piglets = "${piglets}", humanInteraction = "${humanInteraction}", comments = "${comments}") WHERE id="${id}");`
    );
    res.send(results.data); 
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE a sighting from the DB
router.delete("/:id", async function(req, res, next) {
  try {
    const { id } = req.params;
    await db(`DELETE FROM sightings WHERE id = "${id}";`);
    const result = await db("SELECT * FROM sightings");
    res.status(201).send(`Sighting with ID #"${id}" has been deleted correctly!`); 
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

