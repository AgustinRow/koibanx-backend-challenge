const logger = require('../utils/logger');
const express = require('express');
const authenticate = require('../utils/auth');
const Validator = require('../utils/Validator');
const router = express.Router();
const postStoreController = require('../controller/postStoreController');
const getStoresController = require('../controller/getStoresController');
const decorateStore= require('./decorateStore')

router
  .route('/stores')
  .get(authenticate, decorateStore(getStoresController))
  .post(authenticate, Validator('storesSchema'), postStoreController);

module.exports = router;
