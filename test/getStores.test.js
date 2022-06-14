const chai = require('chai');
const { expect } = chai;
const getStores = require('../usecase/store/getStores');
const { makeFakeStore } = require('../utils/makeFakeStore');

describe('getStore usecase', () => {
  it('should return stores with valid data and pagination info', async () => {
    const page = 1;
    const limit = 2;
    const fakeStores = [makeFakeStore(), makeFakeStore(), makeFakeStore()];
    const storeModel = {
      aggregate: () => {},
      aggregatePaginate: (aggregateQuery, { page, limit }) => {
        return Promise.resolve({
          data: fakeStores,
          page: page,
          limit: limit,
          pages: 2,
          total: 3,
        });
      },
    };
    const stores = await getStores({ storeModel })({ page, limit });
    expect(stores).to.have.property('data');
    expect(stores.data.length).to.be.equal(3);
    expect(stores).to.have.property('page');
    expect(stores.page).to.be.equal(1);
    expect(stores).to.have.property('pages');
    expect(stores.pages).to.be.equal(2);
    expect(stores).to.have.property('limit');
    expect(stores.limit).to.be.equal(2);
    expect(stores).to.have.property('total');
    expect(stores.total).to.be.equal(3);
  });
  it('should return stores data with the required inputs ', async () => {
    const page = 1;
    const limit = 2;
    const fakeStores = [makeFakeStore()];
    const storeModel = {
      aggregate: () => {},
      aggregatePaginate: (aggregateQuery, { page, limit }) => {
        return Promise.resolve({
          data: fakeStores,
          page: page,
          limit: limit,
          pages: 2,
          total: 3,
        });
      },
    };
    const stores = await getStores({ storeModel })({ page, limit });
    expect(stores).to.have.property('data');
    expect(stores.data[0]).to.have.property('_id');
    expect(stores.data[0]).to.have.property('comercio');
    expect(stores.data[0]).to.have.property('cuit');
    expect(stores.data[0]).to.have.property('balance actual');
    expect(stores.data[0]).to.have.property('ultima venta');
  });
});
