const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');

const services = () => {
  return {
    db: {
      connect: async () => {
        return await mongoose.connect(config.get('mongodb.url'), {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      },
    },
  };
};
module.exports = services;
