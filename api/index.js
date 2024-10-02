require('dotenv-flow').config();
require('express-async-errors');
const path = require('path');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const fallback = require('@blocklet/sdk/lib/middlewares/fallback');

const payment = require('@blocklet/payment-js').default;

payment.environments.setLivemode(process.env.PAYMENT_LIVEMODE === 'true');

const { name, version } = require('../package.json');
const logger = require('./libs/logger');
const usageJob = require('./jobs/usage');

const app = express();

app.set('trust proxy', true);
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: '1 mb' }));
app.use(express.urlencoded({ extended: true, limit: '1 mb' }));

const router = express.Router();

router.use('/api', require('./routes'));

app.use(router);

const isProduction = process.env.NODE_ENV === 'production' || process.env.ABT_NODE_SERVICE_ENV === 'production';
if (isProduction) {
  const staticDir = path.resolve(process.env.BLOCKLET_APP_DIR, 'dist');
  app.use(express.static(staticDir, { index: 'index.html' }));
  app.use(fallback('index.html', { root: staticDir, maxAge: 0 }));

  app.use((req, res) => {
    res.status(404).send('404 NOT FOUND');
  });
  app.use((err, req, res) => {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
  });
}

const port = parseInt(process.env.BLOCKLET_PORT, 10) || 3030;

app.listen(port, (err) => {
  if (err) throw err;
  logger.info(`> ${name} v${version} ready on ${port}`);

  usageJob.init();
});

module.exports = { app };
