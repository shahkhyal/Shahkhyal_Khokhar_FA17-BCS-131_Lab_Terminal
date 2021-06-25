const error = require('../middleware/error');
const matchRoutes = require('../routes/match');
const userRoutes = require('../routes/user');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = function (app) {
  // app.use(cors(corsOptions));
  // app.options('*', cors());
  app.use(cors());
  // app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/api/user', userRoutes);
  app.use('/api/match', matchRoutes);

  app.use(error);
};
