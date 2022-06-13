const logger = require('../utils/logger');

const decorateStore = (getStoreController) => {
  return async (req, res) => {
    try {
      const { q } = req.query;
      const pagination = JSON.parse(q);
      console.log(pagination);
      const page = pagination.page || 1;
      const limit = { limit: 10 };
      const stores = await getStoreController({ page, limit });
      res.status(200).json(stores);
    } catch (error) {
      logger.error(error);
      res.status(401);
    }
  };
};

module.exports = decorateStore;
