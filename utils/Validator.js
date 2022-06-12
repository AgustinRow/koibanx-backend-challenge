const Validators = require('./validators');

module.exports = (validator) => {
  if (!Object.prototype.hasOwnProperty.call(Validators, validator))
    throw new Error(`'${validator}' validator does not exist`);
  return async function (req, res, next) {
    try {
      console.log(validator, req.body);
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      console.log(validated);
      next();
    } catch (err) {
      if (err.isJoi) return res.status(400).json({ message: err.message });
      res.status(500).json({ message: 'Internal Server error' });
    }
  };
};
