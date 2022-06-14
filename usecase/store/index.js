const storeModel = require('../../models/store');
const saveStoreInstance = require('./saveStore');
const getStoresInstance = require('./getStores');

const saveStore = saveStoreInstance({ storeModel });
const getStores = getStoresInstance({ storeModel });

module.exports = { saveStore, getStores };
