const logger = require('../../utils/logger');
//const { saveStore } = require('../usecase/store/');

const postStoreController =
  ({ saveStore }) =>
  async (req, res) => {
    try {
      const store = req.body;
      const isStoreCreated = await saveStore({ store });
      if (isStoreCreated) {
        res.status(201).json({ message: 'store created succesfully' });
      } else {
        res.status(400).json({ error: 'Bad Request' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      logger.error(error);
    }
  };

module.exports = { postStoreController };
