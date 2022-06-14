const logger = require('../../utils/logger');


const getStoresController =
  ({ getStores, decorateData }) =>
  async ({ page, limit }) => {
    try {
      const stores = await getStores({ page, limit });
      const responseDecorted = {
        data: decorateData(stores.docs),
        page: stores.page,
        limit: stores.limit,
        pages: stores.totalPages,
        total: stores.totalDocs,
      };
      return responseDecorted;
    } catch (error) {
      logger.error(error);
      throw Error();
    }
  };

module.exports = { getStoresController };
