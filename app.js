const mongoose = require("mongoose");
const logger = require("./utils/logger");
mongoose.Promise = Promise;

const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const config = require("config");

require("./utils/initializer").init();

app.use("/api", require("./routes/stores"));

// Start the server and thhen connect to database
app.listen(config.get("port"), async () => {
  try {
    await mongoose.connect(config.get("mongodb.url"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (mongoose.STATES[mongoose.connection.readyState] == "connected") {
      logger.info("Database connected");
    }
  } catch (error) {
    logger.info(error);
  }
});
logger.info("API initialized on port " + config.get("port"));

module.exports = app;
