const storeModel = require('../../models/store');
const saveStoreInstance = require('./saveStore');

const saveStore = saveStoreInstance({ storeModel });

module.exports = saveStore;
