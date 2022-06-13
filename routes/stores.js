const logger = require('../utils/logger');
const express = require('express');
const authenticate = require('../utils/auth');
const Validator = require('../utils/Validator');
const router = express.Router();
const postStoreController = require('../controller/postStoreController');

router
  .route('/stores')
  .get(authenticate, (req, res) => {
    const { query } = req;
    logger.info(query);
    res.status(200).json({ message: 'auth ok' });
  })
  .post(authenticate, Validator('storesSchema'), postStoreController);

module.exports = router;
