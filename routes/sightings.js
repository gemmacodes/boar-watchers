var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const sightingMustExist = require("../guards/sightingMustExist.js");

/* GET sightings listing. */
router.get('/', async function(req, res, next) {
  try{
    const results = await db("SELECT * FROM sightings ORDER BY timestamp DESC;")
    res.send(results.data);
  }
  catch(err){
    res.status(500).send(err);
  }
});

/* GET sightings for a specific month. */
router.get('/timerange/:year/:month', async function(req, res, next) {
  try{
    const { month, year } = req.params;
    const results = await db(`SELECT * FROM sightings WHERE MONTHNAME(timestamp)="${month}" AND YEAR(timestamp)="${year}" ORDER BY timestamp DESC`)
    res.send(results.data);
  }
  catch(err){
    res.status(500).send(err);
  }
});

/* GET one sighting. */
router.get('/:id', sightingMustExist, async function(req, res, next) {
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
    console.log("I am in the backend: ", timestamp);
    await db(
      `INSERT INTO sightings (timestamp, latitude, longitude, adults, piglets, humanInteraction, comments) VALUES ("${timestamp}", "${latitude}", "${longitude}", "${adults}", "${piglets}", "${humanInteraction}", "${comments}");` 
    );
    const results = await db(`SELECT * FROM sightings ORDER BY timestamp DESC;`);
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// MODIFY sighting information
router.put("/:id", sightingMustExist, async function(req, res, next) {
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
router.delete("/:id", sightingMustExist, async function(req, res, next) {
  try {
    const { id } = req.params;
    await db(`DELETE FROM sightings WHERE id = "${id}";`);
    const result = await db("SELECT * FROM sightings ORDER BY timestamp DESC");
    res.status(201).send(result.data); 
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

