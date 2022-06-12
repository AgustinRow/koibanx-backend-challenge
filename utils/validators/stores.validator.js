const DateExtension = require('@joi/date');
const JoiImport = require('joi');
const Joi = JoiImport.extend(DateExtension);

const storesSchema = Joi.object().keys({
  name: Joi.string().max(50).required(),
  cuit: Joi.string()
    .max(13)
    .min(13)
    .required()
    .pattern(/^20|23|30-[00000000-99999999]-0|1|2|3|8|9$/)
    .messages({
      'any.required': 'cuit number must be provided',
      'string.pattern.base': 'must be a valid cuit',
    }),
  concepts: Joi.array().items(Joi.string()).required(),
  currentBalance: Joi.number().required(),
  lastSale: Joi.date()
    .format('DD/MM/YYYY')
    .raw()
    .required(),
});

module.exports = storesSchema;
