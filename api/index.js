const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./lib/logger');
const errorHandler = require('./lib/errorHandler');
const db = require('./db');
const routes = require('./routes');
const redirector = require('./routes/v1/redirect');

const app = express();
const router = express.Router();
const dbUrl = config.db.url;
const port = process.env.PORT || config.port;

// Setup server
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use('/v1', routes(router));
app.use('/:hash', redirector);

// Connect DB and start server
db.connect(dbUrl, (err) => {
  if (err) return logger.log(err);

  return app.listen(port, () => {
    logger.log('> mongodb connected on:', dbUrl.split('@')[1]);
    logger.log('> api running on port:', port);
  });
});

app.use(errorHandler);
