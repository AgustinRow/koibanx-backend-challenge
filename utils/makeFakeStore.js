const Fakerator = require('fakerator');
const loadash = require('lodash');
const merge = loadash.merge;
const faker = Fakerator('es-ES');

const makeFakeStore = (store) => {
  const fakeStore = {
    _id: faker.random.number(999),
    name: faker.company.name(),
    cuit: faker.populate('##-########-#'),
    concepts: [
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
    ],
    currentBalance: 103500,
    lastSale: '01/10/2022',
  };
  return merge(fakeStore, store);
};

module.exports = makeFakeStore;
