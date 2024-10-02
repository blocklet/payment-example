import { Box, Button, FormControl, Stack, TextField, Typography } from '@mui/material';
import { PricingItem } from '@blocklet/payment-react';
import { useState } from 'react';

export default function PricingItemDemo() {
  const [priceId, setPriceId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showPricingItem, setShowPricingItem] = useState(false); // 新增状态控制PricingItem的显示

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPricingItem(true);
  };
  return (
    <Stack display="flex" flexDirection="row" gap={2}>
      <FormControl component="form" onSubmit={handleSubmit} sx={{ flex: 1, maxWidth: '30%' }}>
        <TextField
          label="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          margin="normal"
        />
        <TextField label="Price ID" value={priceId} onChange={(e) => setPriceId(e.target.value)} margin="normal" />
        <TextField
          label="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          margin="normal"
          type="number"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Confirm
        </Button>
      </FormControl>
      {showPricingItem && productId && (
        <Box sx={{ flex: 2 }}>
          <Stack display="flex" flexDirection="column" gap={2}>
            <Box sx={{ border: '2px solid #eee' }} p={2}>
              <Typography>default price id</Typography>
              <PricingItem productId={productId} quantity={quantity} />
            </Box>
            <Box sx={{ border: '2px solid #eee' }} p={2}>
              <Typography>default price id + custom children</Typography>
              <PricingItem productId={productId} quantity={quantity}>
                {(pricing) => (
                  <Box>
                    <Typography variant="h3" gutterBottom>
                      {pricing.totalPrice}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {pricing.unitPrice}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {pricing.quantity}
                    </Typography>
                  </Box>
                )}
              </PricingItem>
            </Box>
            <Box sx={{ border: '2px solid #eee' }} p={2}>
              <Typography>priceId + custom children</Typography>
              <PricingItem productId={productId} quantity={quantity} priceId={priceId}>
                {(pricing) => (
                  <Box>
                    <Typography variant="h3" gutterBottom>
                      {pricing.totalPrice}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {pricing.unitPrice}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {pricing.quantity}
                    </Typography>
                  </Box>
                )}
              </PricingItem>
            </Box>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
