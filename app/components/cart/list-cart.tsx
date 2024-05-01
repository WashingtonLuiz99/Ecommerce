'use client';

import { useCallback } from 'react';

import CardCart from './card-cart';

import { useCart } from '@/app/hooks/cart';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Button, Stack, Typography } from '@mui/material';

export default function ListCart() {
  const { cart, cartLength, updateCart } = useCart();

  const handleCleanCart = useCallback(() => {
    updateCart({
      id: cart?.id,
      cart_items: [],
      sub_total: 0,
    });
  }, [cart?.id, updateCart]);

  return (
    <Box
      component="section"
      gap={2}
      display="flex"
      flexDirection="column"
      flex={2}
      sx={{
        border: 'solid 1px',
        borderColor: '#565656',
        p: 5,
        borderRadius: 4,

        '@media (max-width: 600px)': {
          p: 2,
        },
      }}
    >
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h5" fontWeight="bold">
          {`Carrinho ${cartLength > 0 ? `(${cartLength})` : ''} `}
        </Typography>

        {cartLength > 0 && (
          <Button color="error" onClick={handleCleanCart}>
            <DeleteOutlineIcon fontSize="small" /> Limpar carrinho
          </Button>
        )}
      </Box>
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
