const chai = require('chai');
const { expect } = chai;
const getStores = require('../usecase/store/getStores');

describe('getStore usecase', () => {
  it('should return stores with ', async () => {
    const page = 1;
    const limit = 5;
    const stores = getStores({})({ page, limit });
    /*  expect(stores).to.have.property('data');
    expect(stores.data.lenght).to.be.equal(15);
    expect(stores).to.have.property('page');
    expect(stores.page).to.be.equal(1);
    expect(stores).to.have.property('pages');
    expect(stores.pages).to.be.equal(3);
    expect(stores).to.have.property('limit');
    expect(stores.limit).to.be.equal(5);
    expect(stores).to.have.property('total');
    expect(stores.total).to.be.equal(15); */
  });
  it('', () => {});
});
