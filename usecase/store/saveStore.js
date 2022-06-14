const logger = require('../../utils/logger');

const saveStoreInstance =
  ({ storeModel }) =>
  async ({ store }) => {
    const storeAlreadyExist = await storeModel.findOne({
      cuit: store.cuit,
    });
    if (storeAlreadyExist) {
      return false;
    } else {
      await storeModel.create(store);
      return true;
    }
  };

module.exports = saveStoreInstance;
