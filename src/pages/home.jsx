import { Box, Button, Card, Typography } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

export default function CheckoutPage() {
  return (
    <Box maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" mb={4}>
        Payment Kit Examples
      </Typography>
      <Card variant="outlined" sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Checkout</Typography>
        <Typography variant="body1" sx={{ m: 1 }}>
          This is the main example of the payment kit. It allows you to create a checkout page with a custom form and
          payment methods.
        </Typography>
        <Typography variant="body1" sx={{ m: 1 }}>
          <strong>
            You may need to add an id to the query of your link.
            <pre style={{ whiteSpace: 'break-spaces' }}>
              Such as : /example/checkout?type=link&id=prctbl_kOsaIiPrsHAwwALaKgy17mIl
            </pre>
          </strong>
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="flex-start" gap={3}>
          <Button variant="contained" size="large" component={Link} to="/subscription">
            Purchase with NFT
          </Button>
          <Button variant="contained" size="large" component={Link} to="/checkout?type=session">
            Checkout Session
          </Button>
          <Button variant="contained" size="large" component={Link} to="/checkout?type=link">
            Checkout Link
          </Button>
          <Button variant="contained" size="large" component={Link} to="/checkout?type=link-hide-summary">
            Checkout Link (Hide Summary)
          </Button>
          <Button variant="contained" size="large" component={Link} to="/checkout?type=table">
            Pricing Table
          </Button>
        </Box>
      </Card>
      <Card variant="outlined" sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Donate</Typography>
        <Typography variant="body1" sx={{ m: 1 }}>
          This example shows how to create a donation page with different options.
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="flex-start" gap={3}>
          <Button variant="contained" size="large" component={Link} to="/checkout?type=donate-preset-custom">
            Donate: preset + custom
          </Button>
          <Button variant="contained" size="large" component={Link} to="/checkout?type=donate-preset-only">
            Donate: preset only
          </Button>
          <Button variant="contained" size="large" component={Link} to="/checkout?type=donate-custom-only">
            Donate: custom only
          </Button>
          <Button variant="contained" size="large" component={Link} to="/checkout?type=donate-custom-inline">
            Donate: custom + inline
          </Button>
          <Button variant="contained" size="large" component={Link} to="/checkout?type=donate-inline-article">
            Donate: inline + article
          </Button>
          <Button variant="contained" size="large" component={Link} to="/checkout?type=donate-self">
            Donate: Self
          </Button>
        </Box>
      </Card>
      <Card variant="outlined" sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Utils</Typography>
        <Typography variant="body1" sx={{ m: 1 }}>
          This example shows how to use the utility functions of the payment kit.
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="flex-start" gap={3}>
          <Button variant="contained" size="large" component={Link} to="/utils">
            Utils: More examples
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
