const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
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

// POST
router.post('/', (req, res) => {
    const newTask= req.body
    console.log('New Task', newTask);

    const queryText = `INSERT INTO "toDos" (task)
    VALUES ($1); 
    `;

    pool.query(queryText, [newTask.task])
    .then((result) => {
        res.sendStatus(201)
    })
    .catch((error) => {
        console.log(`Error making query ${queryText}`, error);
        res.sendStatus(500);
    })
   
});

module.exports = router;