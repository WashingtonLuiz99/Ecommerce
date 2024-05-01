import Image from 'next/image';

import { getProductById } from '@/app/lib/api/products';
import { formatCurrency } from '@/app/lib/utils';

import { Box, Button, Container, TextField, Typography } from '@mui/material';

export default async function Product({ params }: { params: { id: number } }) {
  const id = params.id;
  console.log(params);
  const data = await getProductById(id);

  return (
    <Container component="main">
      <Box display="flex" flexDirection="row" gap={8} py={8}>
        <Box
          position="relative"
          display="flex"
          bgcolor="#fff"
          boxShadow={3}
          width={416}
          height={416}
          borderRadius={4}
          overflow="hidden"
        >
          <Image
            src={data.image}
            alt={`imagem ${data.title}`}
            fill
            style={{ objectPosition: 'center', objectFit: 'contain' }}
          />
        </Box>
        <Box flex={1} display="flex" flexDirection="column" gap={4}>
          <Typography variant="h3">{data.title}</Typography>

          <Typography variant="body1" fontSize={20}>
            {data.description}
          </Typography>

          <Typography variant="body1" fontSize={25} fontWeight="bold">
            {formatCurrency(data.price)}
          </Typography>

          <Box display="flex" flexDirection="row" gap={4}>
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button
              variant="contained"
              // onClick={handleAddCart}
            >
              Adicionar
            </Button>

            <Button
              variant="contained"
              // onClick={handleAddCart}
            >
              Remover
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
