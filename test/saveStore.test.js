const chai = require('chai');
const { expect } = chai;
const saveStore = require('./../usecase/store/saveStore');

const fakePayload = {
  name: 'Energia',
  cuit: '20-36683050-3',
  concepts: ['123', '2123'],
  currentBalance: 123,
  lastSale: '01/10/2022',
};

const fakeStore = {
  _id: '123455dkasnkdsa',
  name: 'Energia',
  cuit: '20-36683050-3',
  concepts: ['123', '2123'],
  currentBalance: 123,
  lastSale: '01/10/2022',
};

const storeModel = {
  findOne: () => {
    return fakeStore;
  },
};

describe('saveStore usecase', () => {
  it('should save a store', async () => {
    const saveStoreResult = await saveStore({
      storeModel: {
        findOne: () => {
          return null;
        },
        create: () => {
          return Promise.resolve(fakeStore);
        },
      },
    })({ store: fakePayload });
    expect(saveStoreResult).to.be.true;
  });
  it('should not save if store already exists', async () => {
    const saveStoreResult = await saveStore({
      storeModel: {
        findOne: () => {
          return fakeStore;
        },
      },
    })({ store: fakePayload });
    expect(saveStoreResult).to.be.false;
  });
  it.skip('should throw an error when mongoose scheme is not valid', async () => {
    const saveStoreResult = await saveStore({
      storeModel: {
        findOne: () => null,
        create: () => Promise.reject(),
      },
    })({ store: fakePayload });
    const result = await saveStore({
      storeModel: {
        findOne: () => null,
        create: () => Promise.reject('error'),
      },
    })(fakePayload);
    expect(result).to.throw;
  });
});
