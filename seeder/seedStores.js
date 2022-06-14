var seeder = require('mongoose-seed');
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');
const { mongodb } = require('config');
const { makeFakeStoreForPopulate } = require('../utils/makeFakeStore');

// Connect to MongoDB via Mongoose
seeder.connect(
  mongodb.url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function () {
    // Load Mongoose models
    seeder.loadModels(['models/store.js']);

    // Clear specified collections
    seeder.clearModels(['Store'], function () {
      // Callback to populate DB once collections have been cleared
      seeder.populateModels(data, function () {
        seeder.disconnect();
      });
    });
  },
);

// Data array containing seed data - documents organized by Model
const populateDocument = () => {
  let documents = [];
  for (let i = 0; i < 20; i++) {
    documents.push(makeFakeStoreForPopulate());
  }
  return documents;
};
var data = [
  {
    model: 'Store',
    documents: populateDocument(),
  },
];
