const { aggregate } = require('../../models/store');
const logger = require('../../utils/logger');

const getStoresInstance =
  ({ storeModel }) =>
  async ({ page, limit }) => {
    const aggregateQuery = storeModel.aggregate();
    const stores = await storeModel.aggregatePaginate(aggregateQuery, {
      page,
      limit,
    });
    return stores;
  };

module.exports = getStoresInstance;
