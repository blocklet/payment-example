/* eslint-disable no-await-in-loop */
const payment = require('@blocklet/payment-js').default;

const SUBSCRIPTION_ID = (process.env.METERED_SUBSCRIPTION_ID || '')
  .split(',')
  .map((x) => x.trim())
  .filter(Boolean);

const createUsageRecord = async () => {
  for (const subId of SUBSCRIPTION_ID) {
    const result = await payment.subscriptionItems.list({ subscription_id: subId });
    for (const item of result.list) {
      if (item.price.recurring?.usage_type === 'metered') {
        try {
          const record = await payment.subscriptionItems.createUsageRecord({
            subscription_item_id: item.id,
            quantity: Math.ceil(Math.random() * 2000),
            timestamp: Math.floor(Date.now() / 1000),
          });
          console.warn('createUsageRecord', record);
        } catch (err) {
          // Do nothing
        }
      }
    }
  }

  setTimeout(createUsageRecord, 1000 * 30);
};

module.exports = {
  createUsageRecord,
  init: () => {
    setTimeout(createUsageRecord, 1000 * 5);
  },
};
