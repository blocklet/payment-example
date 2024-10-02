const router = require('express').Router();
const component = require('@blocklet/sdk/lib/component');
const userMiddleware = require('@blocklet/sdk/lib/middlewares/user');
const payment = require('@blocklet/payment-js').default;
const { verifySig } = require('@blocklet/sdk/lib/middlewares/component');

const { DEFAULT_PRICE_ID } = require('../libs/const');
const store = require('../libs/store');

const user = userMiddleware();

router.get('/purchases', user, async (req, res) => {
  if (!req.user) {
    res.json([]);
    return;
  }

  const purchases = await store.find({ userDid: req.user.did, status: 'completed' });
  res.json(purchases);
});

router.post('/checkout', user, async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: 'Please login to continue purchase' });
    return;
  }

  const { domain } = req.body;

  const exist = await store.findOne({ domain, status: 'completed' });
  if (exist) {
    res.status(400).json({ message: 'Domain already occupied' });
    return;
  }

  const purchase = await store.insert({
    domain,
    userDid: req.user.did,
    status: 'pending',
    checkoutId: '',
  });

  const price = await payment.prices.retrieve(DEFAULT_PRICE_ID);
  const checkoutSession = await payment.checkout.sessions.create({
    success_url: component.getUrl(`/api/checkout/success?id=${purchase._id}`),
    line_items: [
      {
        price_id: price.id,
        quantity: 1,
      },
    ],
    nft_mint_settings: {
      enabled: true,
      factory: price.product.nft_factory || price.product.metadata?.nft_factory,
      behavior: 'per_checkout_session',
      inputs: {
        domain,
      },
    },
    metadata: {
      purchaseId: purchase._id,
      domain,
    },
  });

  await store.update(
    { _id: purchase._id },
    {
      $set: {
        checkoutId: checkoutSession.id,
        userDid: checkoutSession.customer_did,
      },
    }
  );

  res.json({ url: checkoutSession.url });
});

router.get('/checkout/success', async (req, res) => {
  const purchase = await store.findOne({ _id: req.query.id });
  if (!purchase) {
    res.status(404).json({ message: 'Purchase not found' });
    return;
  }

  if (purchase.status !== 'pending') {
    res.status(400).json({ message: 'Purchase already completed' });
    return;
  }

  const checkoutSession = await payment.checkout.sessions.retrieve(purchase.checkoutId);
  if (checkoutSession.status !== 'complete') {
    res.status(400).json({ message: 'Checkout session not complete' });
    return;
  }

  await store.update(
    { _id: purchase._id },
    {
      $set: {
        status: 'completed',
      },
    }
  );

  res.redirect(component.getUrl(`/checkout?success=${purchase.domain}`));
});

router.post('/payment/callback', verifySig, (req, res) => {
  const random = Math.random();
  if (random < 0.1) {
    res.status(500).json({ message: 'Internal server error', type: req.body.type });
  } else {
    res.status(200).json({ message: 'ok', random, type: req.body.type });
  }
});

module.exports = router;
