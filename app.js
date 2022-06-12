const services = require('./services');
const { start } = require('./server');

start(services());
