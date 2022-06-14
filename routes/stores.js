const logger = require('../utils/logger');
const express = require('express');
const authenticate = require('../utils/auth');
const Validator = require('../utils/Validator');
const router = express.Router();
const {
  postStoreControllerInstance,
  getStoresControllerInstance,
} = require('../controller/stores/');
const decorateStore = require('./decorateStore');

router
  .route('/stores')
  .get(authenticate, decorateStore(getStoresControllerInstance))
  .post(authenticate, Validator('storesSchema'), postStoreControllerInstance);

module.exports = router;
