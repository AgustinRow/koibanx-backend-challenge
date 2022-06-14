const mongoose = require('mongoose');
const logger = require('./utils/logger');
mongoose.Promise = Promise;

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');
const { port } = require('config');

require('./utils/initializer').init();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/stores'));

const build = () => app;

const start = async ({ db }) => {
  app.listen(config.get('port'), async () => {
    try {
      await db.connect();
      if (mongoose.STATES[mongoose.connection.readyState] == 'connected') {
        logger.info('Database connected');
      }
      logger.info('API initialized on port ' + port);
    } catch (error) {
      logger.info(error);
    }
  });
};

module.exports = { start, build };
