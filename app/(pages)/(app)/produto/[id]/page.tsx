import Image from 'next/image';

import { getProductById } from '@/app/lib/api/products';
import { formatCurrency } from '@/app/lib/utils';

import FormQtd from '@/app/components/productOpen/formQtd';
import { Box, Container, Typography } from '@mui/material';

export default async function Product({ params }: { params: { id: number } }) {
  const id = params.id;

  const data = await getProductById(id);

  return (
    <Container
      component="main"
      sx={{
        py: 8,
        gap: 8,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        alignItems="center"
        gap={8}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          '@media (max-width: 1024px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Box
          position="relative"
          display="flex"
          bgcolor="#fff"
          boxShadow={3}
          width={416}
          height={416}
          borderRadius={4}
          overflow="hidden"
          sx={{
            '@media (max-width: 500px)': {
              width: '100%',
            },
          }}
        >
          <Image
            src={data.image}
            alt={`imagem ${data.title}`}
            fill
            style={{ objectPosition: 'center', objectFit: 'contain' }}
          />
        </Box>
        <Box flex={1} display="flex" flexDirection="column" gap={8}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h3">{data.title}</Typography>
            <Typography variant="body2">{data.category}</Typography>
          </Box>

          <Typography variant="body1" fontSize={25} fontWeight="bold">
            {formatCurrency(data.price)}
          </Typography>

          <FormQtd data={data} />
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap={4}>
        <Typography variant="h5" fontWeight="bold">
          Description
        </Typography>
        <Typography variant="body1" fontSize={20}>
          {data.description}
        </Typography>
      </Box>
    </Container>
  );
}
