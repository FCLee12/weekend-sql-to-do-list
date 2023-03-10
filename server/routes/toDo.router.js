const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
// Add a query to select koalas from database
router.get("/", (req, res) => {
    const queryText = 'SELECT * FROM "toDos"';
    console.log("Submitting Query to DB:", queryText);
  
    pool.query(queryText)
      .then((result) => {
        console.log('All my result info:', result);
        res.send(result.rows);
      })
      .catch((err) => {
        console.log(`Error making query ${queryText}`, err)
        res.sendStatus(500);
      });
  });

module.exports = router;