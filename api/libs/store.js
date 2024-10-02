const { DataStore } = require('@nedb/core');
const path = require('path');

const env = require('@blocklet/sdk/lib/env');

const store = new DataStore({ filename: path.join(env.dataDir, 'purchases.db'), autoload: true, timestampData: true });

module.exports = store;
