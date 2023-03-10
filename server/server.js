const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const router = require('./routes/toDo.router.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));
app.use(bodyParser.json());

// ROUTES
app.use('/weekend-to-do-app', router);

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
