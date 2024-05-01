import ListCart from '@/app/components/cart/list-cart';
import { Box, Container } from '@mui/material';

export default function Carrinho() {
  return (
    <Container component="main">
      <Box>
        <ListCart />
      </Box>
    </Container>
  );
}
