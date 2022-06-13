const logger = require('../utils/logger');
const { getStores } = require('../usecase/store');
const store = require('../models/store');

const decorateData = (data) => {
  const mapData = [];
  data.forEach((element) => {
    mapData.unshift({
      _id: element._id,
      comercio: element.name,
      cuit: element.cuit,
      conceptos: element.conceptos,
      'balance actual': element.currentBalance,
      'ultima venta': element.lastSale,
    });
  });
  return mapData;
};

const getStoresController = async ({ page, limit }) => {
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
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getStoresController;
