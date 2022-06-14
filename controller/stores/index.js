const logger = require('../../utils/logger');
const dayjs = require('dayjs');
const { postStoreController } = require('./postStoreController');
const { getStoresController } = require('./getStoresController');
const { getStores } = require('../../usecase/store');
const { saveStore } = require('../../usecase/store/');

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const decorateData = (data) => {
  const mapData = [];
  data.forEach((element) => {
    mapData.unshift({
      _id: element._id,
      comercio: element.name,
      cuit: element.cuit,
      conceptos: element.conceptos,
      'balance actual': formatter.format(element.currentBalance),
      'ultima venta': dayjs(element.lastSale).format('DD/MM/YYYY'),
    });
  });
  return mapData;
};

const getStoresControllerInstance = getStoresController({
  getStores,
  decorateData,
});

const postStoreControllerInstance = postStoreController({ saveStore });

module.exports = { getStoresControllerInstance, postStoreControllerInstance };
