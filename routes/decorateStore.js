const logger = require('../utils/logger');

const decorateStore = (getStoreController) => {
  return async (req, res) => {
    try {
      const { q } = req.query;
      const pagination = JSON.parse(q);
      const page = pagination.page || 1;
      const limit = pagination.limit || 10;
      const stores = await getStoreController({ page, limit });
      res.status(200).json(stores);
    } catch (error) {
      res.status(400).json({ error: 'bad request' });
    }
  };
};

module.exports = decorateStore;
