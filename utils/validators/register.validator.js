const Joi = require('joi');

const registerSchema = Joi.object().keys({
  email: Joi.string().email().max(50).required(),
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50).required(),
});

module.exports = registerSchema;
