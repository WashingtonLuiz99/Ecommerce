'use client';

import { formatCurrency } from '@/app/lib/utils';

import ListCart from '@/app/components/cart/list-cart';
import { useCart } from '@/app/hooks/cart';
import { Box, Container, Typography } from '@mui/material';

export default function Carrinho() {
  const { cartLength, cart } = useCart();
  return (
    <Container
      component="main"
      sx={{
        py: 8,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
          '@media (max-width: 1024px)': {
            flexDirection: 'column',
          },
        }}
      >
        <ListCart />

        <Box
          display="flex"
          flex={1}
          flexDirection="column"
          sx={{
            border: 'solid 1px',
            borderColor: '#565656',
            p: 5,
            borderRadius: 4,
            '@media (max-width: 600px)': {
              p: 2,
            },
          }}
          height="fit-content"
        >
          {cartLength > 0 && (
            <Box
              display="flex"
              flexDirection="row"
              gap={3}
              width="100%"
              alignItems="center"
            >
              <Typography variant="h5" fontWeight="bold">
                Total
              </Typography>

              <hr
                style={{
                  display: 'flex',
                  flex: 1,
                  height: 1,
                }}
              />

              <Typography variant="h5" fontWeight="bold">
                {formatCurrency(cart?.sub_total || 0)}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}
