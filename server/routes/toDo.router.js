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
    const newTask= req.body;
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

// DELETE
router.delete('/task/:id', (req, res) => {
    console.log('router-DELETE');
    const taskIdToDelete = req.params.id;
    const queryText = `DELETE FROM "toDos" WHERE "id" = $1;`

    pool.query(queryText, [taskIdToDelete])
    .then((response) => {
        console.log('Successful deletion for task id:', taskIdToDelete);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('There was an error deleting the task', error);
        res.sendStatus(500);
    })
});

// PUT
router.put('/taskComplete/:id', (req, res) => {
    console.log('router-PUT');
    const taskIdToUpdate = req.params.id;
    const queryText = `UPDATE "toDos" SET "complete" = true WHERE "id" = $1;`

    pool.query(queryText, [taskIdToUpdate])
    .then((response) => {
        console.log('Successful update for task id:', taskIdToUpdate);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('There was an error updating the task', error);
        res.sendStatus(500);
    })
});

module.exports = router;