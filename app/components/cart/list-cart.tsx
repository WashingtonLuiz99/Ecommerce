'use client';

import CardCart from './card-cart';

import { useCart } from '@/app/hooks/cart';
import { Box, Stack } from '@mui/material';

export default function ListCart() {
  const { cart } = useCart();
  return (
    <Box component="section" py={10}>
      <Stack
        gap={4}
        justifyContent="center"
        direction="column"
        useFlexGap
        flexWrap="wrap"
      >
        {cart?.cart_items.map(item => <CardCart key={item.id} {...item} />)}
      </Stack>
    </Box>
  );
}
