const pg = require("pg");
let pool;

// if there is a heroku URL available, use that
if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  } else { // if there isn't, use localhost
      pool = new pg.Pool({
        database: "weekend-to-do-app", // DB NAME not table!
        host: "localhost",
        port: 5432,
        // number of milliseconds a client must sit idle in the pool and not be checked out
        // before it is disconnected from the backend and discarded
        // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
        idleTimeoutMillis: 30000,
      });
  } 

module.exports = pool;