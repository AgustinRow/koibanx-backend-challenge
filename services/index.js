const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const { mongodb } = require('config');

const services = () => {
  return {
    db: {
      connect: async () => {
        return await mongoose.connect(mongodb.url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      },
    },
  };
};
module.exports = services;
