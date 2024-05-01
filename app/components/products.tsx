import { getAllProducts } from '@/app/lib/api/products';

import CardProduct from './card-product';

import { Box, Stack } from '@mui/material';

export default async function ContainerProducts() {
  const products = await getAllProducts();

  return (
    <Box component="section" py={10}>
      <Stack
        gap={4}
        justifyContent="center"
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {products.map(item => (
          <CardProduct key={item.id} {...item} />
        ))}
      </Stack>
    </Box>
  );
}
