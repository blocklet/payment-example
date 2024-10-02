/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { CheckoutDonate, CheckoutForm, CheckoutTable, PaymentProvider } from '@blocklet/payment-react';
import { Coffee, CurrencyBitcoin, ThumbUp, SentimentSatisfiedOutlined } from '@mui/icons-material';
import { Box, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useSessionContext } from '../contexts/session';
import ArticleWithComments from './discuss/article';

export default function CheckoutPage() {
  const [params] = useSearchParams();
  const id = params.get('id');
  const { session, connectApi } = useSessionContext();
  const [variant, setVariant] = useState('table');

  if (params.get('type') === 'session') {
    return (
      <PaymentProvider session={session} connect={connectApi}>
        <Typography variant="h4" gutterBottom>
          Checkout with session
        </Typography>
        <Paper sx={{ p: 3, display: 'inline-block' }} elevation={3}>
          <CheckoutForm id={id || 'cs_9zeD2yCgPXT9Vit9bab2vVC3V7DFjHiKvyoLzVTVzAf4XSU2oLWY67vKy7'} mode="inline" />
        </Paper>
      </PaymentProvider>
    );
  }

  if (params.get('type') === 'link') {
    return (
      <PaymentProvider session={session} connect={connectApi} baseUrl={window.location.origin}>
        <Typography variant="h4" gutterBottom>
          Checkout with payment link
        </Typography>
        <Paper sx={{ p: 3, display: 'inline-block' }} elevation={3}>
          <CheckoutForm id={id || 'plink_oB1I6FNeHKSkuq81fhJy0vIZ'} mode="inline" onChange={console.info} />
        </Paper>
      </PaymentProvider>
    );
  }

  if (params.get('type') === 'link-hide-summary') {
    return (
      <PaymentProvider session={session} connect={connectApi}>
        <Typography variant="h4" gutterBottom>
          Checkout with payment link
        </Typography>
        <Paper sx={{ p: 3, display: 'inline-block' }} elevation={3}>
          <CheckoutForm
            id={id || 'plink_oB1I6FNeHKSkuq81fhJy0vIZ'}
            showCheckoutSummary={false}
            onChange={console.info}
            theme={{
              // components: {
              //   MuiButton: {
              //     styleOverrides: {
              //       containedPrimary: {
              //         backgroundColor: '#1DC1C7',
              //         color: '#fff',
              //         '&:hover': {
              //           backgroundColor: 'rgb(20, 135, 139)',
              //         },
              //       },
              //     },
              //   },
              // },
              sx: {
                '.cko-submit-button': {
                  backgroundColor: '#1DC1C7',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'rgb(20, 135, 139)',
                  },
                },
              },
            }}
          />
        </Paper>
      </PaymentProvider>
    );
  }

  if (params.get('type') === 'table') {
    return (
      <PaymentProvider session={session} connect={connectApi}>
        <Typography variant="h4" gutterBottom>
          Checkout with pricing table
        </Typography>
        <Paper sx={{ p: 3, display: 'inline-block' }} elevation={3}>
          <CheckoutTable id={id || 'prctbl_kOsaIiPrsHAwwALaKgy17mIl'} mode="inline" onChange={console.info} />
        </Paper>
      </PaymentProvider>
    );
  }

  if (params.get('type') === 'donate-preset-custom') {
    return (
      <PaymentProvider session={session} connect={connectApi}>
        <Box alignItems="center" component="div" display="flex" flexDirection="column" gap={4}>
          <ToggleButtonGroup size="small" value={variant} exclusive onChange={(e, v) => setVariant(v)}>
            <ToggleButton value="avatar">Avatar</ToggleButton>
            <ToggleButton value="table">Table</ToggleButton>
          </ToggleButtonGroup>
          <CheckoutDonate
            livemode={false}
            settings={{
              target: 'donation-test-preset-custom',
              title: 'Donation Test: Preset + Custom',
              description: 'Just a test for donation with presets',
              reference: window.location.href,
              beneficiaries: [
                {
                  address: 'z1bwRy5qayB6aNbxMoEH4kmhjSoqnJZh4Ef',
                  share: '77',
                },
                {
                  address: window.blocklet.appId,
                  share: '33',
                },
              ],
              amount: {
                presets: ['1.99', '2.99', '5.99', '9.99', '19.99', '49.99'],
                minimum: '0.01',
                maximum: '100',
                custom: true,
              },
              appearance: {
                button: {
                  text: 'Like the Author',
                  icon: <ThumbUp fontSize="small" />,
                  color: 'error',
                  variant: 'outlined',
                },
                history: {
                  variant,
                },
              },
            }}
            theme={{
              sx: {
                '.cko-submit-button': {
                  backgroundColor: '#1DC1C7',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'rgb(20, 135, 139)',
                  },
                },
              },
            }}
          />
        </Box>
      </PaymentProvider>
    );
  }

  if (params.get('type') === 'donate-preset-only') {
    return (
      <PaymentProvider session={session} connect={connectApi}>
        <Box alignItems="center" component="div" display="flex" flexDirection="column" gap={4}>
          <ToggleButtonGroup size="small" value={variant} exclusive onChange={(e, v) => setVariant(v)}>
            <ToggleButton value="avatar">Avatar</ToggleButton>
            <ToggleButton value="table">Table</ToggleButton>
          </ToggleButtonGroup>
          <CheckoutDonate
            livemode={false}
            settings={{
              target: 'donation-test-preset-only',
              title: 'Donation Test: Preset Only',
              description: 'Just a test for donation with presets',
              reference: window.location.href,
              beneficiaries: [
                {
                  address: 'z1bwRy5qayB6aNbxMoEH4kmhjSoqnJZh4Ef',
                  share: '77',
                },
                {
                  address: 'z1VfYx6w2ErHJuu4mycKZr7Go6NyEeGZaJS',
                  share: '33',
                },
              ],
              amount: {
                presets: ['1', '2', '5', '10', '20', '50', '100'],
                custom: false,
              },
              appearance: {
                button: {
                  text: 'Buy me a coffee',
                  icon: <Coffee />,
                  size: 'large',
                  color: 'warning',
                  variant: 'contained',
                },
                history: {
                  variant,
                },
              },
            }}
          />
        </Box>
      </PaymentProvider>
    );
  }

  if (params.get('type') === 'donate-custom-only') {
    return (
      <PaymentProvider session={session} connect={connectApi}>
        <Box alignItems="center" component="div" display="flex" flexDirection="column" gap={4}>
          <ToggleButtonGroup size="small" value={variant} exclusive onChange={(e, v) => setVariant(v)}>
            <ToggleButton value="avatar">Avatar</ToggleButton>
            <ToggleButton value="table">Table</ToggleButton>
          </ToggleButtonGroup>
          <CheckoutDonate
            livemode={false}
            settings={{
              target: 'donation-test-custom-only',
              title: 'Donation Test: Custom Only',
              description: 'Just a test for donation with presets',
              reference: window.location.href,
              beneficiaries: [
                {
                  address: 'z1bwRy5qayB6aNbxMoEH4kmhjSoqnJZh4Ef',
                  share: '64',
                },
                {
                  address: 'z1VfYx6w2ErHJuu4mycKZr7Go6NyEeGZaJS',
                  share: '32',
                },
              ],
              amount: {
                minimum: '0.01',
                maximum: '100',
                custom: true,
              },
              appearance: {
                button: {
                  text: 'Support Developer',
                  icon: <CurrencyBitcoin />,
                  color: 'primary',
                  variant: 'contained',
                },
                history: {
                  variant,
                },
              },
            }}
          />
        </Box>
      </PaymentProvider>
    );
  }

  if (params.get('type') === 'donate-custom-inline') {
    return (
      <PaymentProvider session={session} connect={connectApi}>
        <Box alignItems="center" component="div" display="flex" flexDirection="column" gap={4}>
          <CheckoutDonate
            livemode={false}
            mode="inline"
            settings={{
              target: 'donation-test-custom-only2',
              title: 'Donation Test: Custom Only2',
              description: 'Just a test for donation with presets',
              reference: window.location.href,
              beneficiaries: [
                {
                  address: 'z1bwRy5qayB6aNbxMoEH4kmhjSoqnJZh4Ef',
                  share: '64',
                },
                {
                  address: 'z1VfYx6w2ErHJuu4mycKZr7Go6NyEeGZaJS',
                  share: '32',
                },
              ],
              amount: {
                minimum: '0.01',
                maximum: '100',
                custom: true,
              },
              appearance: {
                button: {
                  text: 'Like',
                  icon: <SentimentSatisfiedOutlined />,
                  color: 'primary',
                  variant: 'text',
                },
                history: {
                  variant,
                },
              },
            }}
            inlineOptions={{
              button: {
                text: '打赏',
              },
            }}
          />
        </Box>
      </PaymentProvider>
    );
  }

  if (params.get('type') === 'donate-inline-article') {
    return (
      <PaymentProvider session={session} connect={connectApi}>
        <ArticleWithComments variant={variant} />
      </PaymentProvider>
    );
  }

  if (params.get('type') === 'donate-self') {
    return (
      <PaymentProvider session={session} connect={connectApi}>
        <Box alignItems="center" component="div" display="flex" flexDirection="column" gap={4}>
          <CheckoutDonate
            livemode={false}
            mode="inline"
            settings={{
              target: 'donation-self',
              title: 'Donation Test: Self',
              description: 'Just a test for donation to self',
              reference: window.location.href,
              beneficiaries: [
                {
                  address: session.user?.did,
                  share: '1',
                },
              ],
              amount: {
                minimum: '0.01',
                maximum: '100',
                custom: true,
              },
              appearance: {
                button: {
                  text: 'Like',
                  icon: <SentimentSatisfiedOutlined />,
                  color: 'primary',
                  variant: 'text',
                },
                history: {
                  variant,
                },
              },
            }}
            inlineOptions={{
              button: {
                text: '打赏自己',
              },
            }}
          />
        </Box>
      </PaymentProvider>
    );
  }

  return null;
}
