const UserModel = require('../models/user');
const logger = require('./logger');

const getCredentials = (authorization) => {
  const base64Credentials = authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString(
    'ascii',
  );
  const username = credentials.split(':')[0];
  const password = credentials.split(':')[1];
  return { username, password };
};

const isUserRegistered = async ({ username, password }) => {
  const user = await UserModel.findOne({ username: username }).exec();
  if (user != undefined) {
    return await user.verifyPassword(password);
  } else {
    return false;
  }
};

const authError = (res, next) => {
  res.status(401).json({ error: 'Invalid credentials' });
};

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return authError(res, next);
    const { username, password } = getCredentials(authorization);
    const isRegistered = await isUserRegistered({ username, password });
    if (!isRegistered) return authError(res, next);
    req['user'] = username;
    next();
  } catch (error) {
    logger.info(error);
    authError(res, next);
  }
};

module.exports = authenticate;
