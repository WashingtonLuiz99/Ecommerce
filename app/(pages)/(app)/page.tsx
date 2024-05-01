import ContainerProducts from '@/app/components/products';
import { Box, Container } from '@mui/material';

export default function Home() {
  return (
    <Container component="main">
      <Box>
        <ContainerProducts />
      </Box>
    </Container>
  );
}
