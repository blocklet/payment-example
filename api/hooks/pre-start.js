require('@blocklet/sdk/lib/error-handler');
require('dotenv-flow').config();

const payment = require('@blocklet/payment-js').default;
const { toFactoryAddress } = require('@arcblock/did-util');
const { isValidFactory } = require('@ocap/asset');
const Client = require('@ocap/client');
const { fromTokenToUnit } = require('@ocap/util');

payment.environments.setLivemode(process.env.PAYMENT_LIVEMODE === 'true');

const { getUrl } = require('@blocklet/sdk/lib/component');
const logger = require('../libs/logger');
const { wallet } = require('../libs/auth');
const { DEFAULT_PRICE_ID } = require('../libs/const');

const ensureProductAndPrice = async (address) => {
  const exist = await payment.prices.retrieve(DEFAULT_PRICE_ID).catch(() => false);
  if (exist) {
    await payment.products.update(exist.product_id, { nft_factory: address });
    logger.info('product and price already exist and updated');
    return;
  }

  const product = await payment.products.create({
    type: 'service',
    name: 'DID Domain',
    description: 'Purchase your domain and forget',
    images: [],
    features: [{ name: '1 year domain' }, { name: '1 year hosting' }],
    statement_descriptor: 'ArcBlock',
    nft_factory: address,
    prices: [
      {
        nickname: 'monthly',
        lookup_key: DEFAULT_PRICE_ID,
        type: 'recurring',
        unit_amount: '1.88',
        recurring: {
          interval: 'month',
          interval_count: 1,
          usage_type: 'licensed',
        },
      },
    ],
  });
  logger.info('default product and price created', product);
};

const ensureWebhooks = async () => {
  const enabledEvents = [
    'checkout.session.completed',
    'checkout.session.nft_minted',
    'customer.subscription.created',
    'customer.subscription.deleted',
    'customer.subscription.paused',
    'customer.subscription.updated',
    'customer.subscription.started',
    'customer.subscription.renewed',
    'payment_intent.created',
    'payment_intent.succeeded',
  ];
  const result = await payment.webhookEndpoints.list({ page: 1, size: 100 });
  if (result.list.length) {
    const webhook = await payment.webhookEndpoints.update(result.list[0].id, {
      url: getUrl('/api/payment/callback'),
      enabled_events: enabledEvents,
    });
    logger.info('webhooks updated', webhook);
    return;
  }

  const webhook = await payment.webhookEndpoints.create({
    url: getUrl('/api/payment/callback'),
    enabled_events: enabledEvents,
  });
  logger.info('webhooks created', webhook);
};

const ensureNFTFactory = async () => {
  const methods = await payment.paymentMethods.list({});
  const method = methods.find((x) => x.type === 'arcblock');
  if (!method) {
    return null;
  }

  const currency = method.payment_currencies.find((x) => x.is_base_currency);
  if (!currency) {
    return null;
  }

  const value = fromTokenToUnit(10000, currency.decimal).toString(); // 这里设置一个很大的值, 防止用户 acquire
  try {
    const factory = {
      name: 'Payment Example',
      description: 'Used to mint example NFTs on checkout complete',
      settlement: 'instant',
      limit: 0,
      trustedIssuers: [wallet.address],
      input: {
        value: '0',
        assets: [],
        tokens: [{ address: currency.contract, value }],
        variables: [
          {
            name: 'domain',
            required: true,
          },
        ],
      },
      output: {
        issuer: '{{ctx.issuer.id}}',
        parent: '{{ctx.factory}}',
        moniker: '{{input.domain}}',
        readonly: false,
        transferrable: true,
        data: {
          type: 'json',
          value: {
            domain: '{{input.domain}}',
            version: '2023-10-06',
          },
        },
      },
      hooks: [
        {
          type: 'contract',
          name: 'mint',
          hook: `transferToken('${currency.contract}', '${wallet.address}', '${value}');`,
        },
      ],
      data: {
        type: 'json',
        value: '',
      },
    };

    // @ts-ignore
    factory.address = toFactoryAddress(factory);

    if (isValidFactory(factory) === false) {
      throw new Error('Can not create valid factory props');
    }

    const client = new Client(method.settings.arcblock?.api_host);

    // @ts-ignore
    const { state } = await client.getFactoryState({ address: factory.address });
    if (state) {
      logger.info('test nft factory exist', { address: factory.address });
      return factory.address;
    }

    const [hash, address] = await client.createAssetFactory({ factory, wallet });

    logger.info('test nft factory created', { hash, address });

    return address;
  } catch (error) {
    logger.error('test nft factory create failed', { error });
    throw error;
  }
};

(async () => {
  try {
    const address = await ensureNFTFactory();
    await ensureProductAndPrice(address);
    await ensureWebhooks();
    process.exit(0);
  } catch (err) {
    logger.error('pre-start error', err.message);
    process.exit(1);
  }
})();
