const { app } = require('./startup/server');
require('./startup/config')();
require('./startup/db')();
require('./startup/routes')(app);