const userModel = require('../models/user');
const storeModel = require('../models/store');

const deleteUsers = async () => {
  await userModel.deleteMany({}).exec();
};

const deleteStores = async () => {
  await storeModel.deleteMany({}).exec();
};

module.exports = { deleteUsers, deleteStores };
