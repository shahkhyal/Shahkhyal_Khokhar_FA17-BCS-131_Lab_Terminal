const config = require('config');

module.exports = function () {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('Fatal Error! app_jwt_private_key not set. Exiting...');
  }
};
