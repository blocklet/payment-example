import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import api from '../libs/api';

export default function CheckoutPage() {
  const [params] = useSearchParams();
  const [domain, setDomain] = React.useState('');
  const [purchases, setPurchases] = React.useState([]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    api.get('/api/purchases').then((result) => {
      setPurchases(result.data);
    });
  }, []);

  const onSubmit = async () => {
    if (!domain) {
      setError('Please input domain');
      return;
    }

    try {
      const result = await api.post('/api/checkout', { domain: domain.trim() });
      window.location = result.data.url;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box maxWidth="md" sx={{ mt: 8 }}>
      {params.get('success') && (
        <Alert severity="success" sx={{ mb: 3 }}>
          You have successfully purchased {params.get('success')}
        </Alert>
      )}
      <Stack direction="row" spacing={6}>
        <Stack direction="column" width={300} spacing={3}>
          <Typography variant="h5">Acquire New Domain</Typography>
          <TextField
            label="Domain"
            variant="outlined"
            required
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Purchase Domain with 1.88 TBA
          </Button>
          {!!error && <Alert severity="error">{error}</Alert>}
        </Stack>
        <Stack direction="column" alignItems="flex-start" width={300} spacing={3}>
          <Typography variant="h5">Purchased Items</Typography>
          <ul>
            {purchases.map((purchase) => (
              <li key={purchase._id}>{purchase.domain}</li>
            ))}
          </ul>
        </Stack>
      </Stack>
    </Box>
  );
}
