'use client';

import { useCallback, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { formatCurrency } from '@/app/lib/utils';

import { useCart } from '@/app/hooks/cart';
import { type IProduct } from '@/app/interfaces/IProduct';
import type ICartItem from '@/app/interfaces/IProductCart';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';

export default function CardCart({ id, amount, stock }: ICartItem) {
  const { addCartItem } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        p: 2,
      }}
    >
      <Image
        src={stock.image}
        placeholder="blur"
        blurDataURL={stock.image}
        alt={`Imagem do produto ${stock.title}`}
        width={64}
        height={64}
        style={{
          borderRadius: 20,
          objectPosition: 'center',
          objectFit: 'contain',
        }}
      />

      <Box
        component="div"
        px={3}
        py={2}
        gap={4}
        flexDirection="row"
        display="flex"
        justifyContent="space-between"
        flex={1}
      >
        <Typography
          variant="h6"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {stock.title}
        </Typography>

        <Typography variant="body1" fontSize={20}>
          {formatCurrency(stock.value)}
        </Typography>

        {/* <Button
            variant="contained"
            sx={{ width: '100%' }}
            onClick={handleAddCart}
          >
            {!loading ? 'Adicionar' : <CircularProgress />}
          </Button> */}
      </Box>
    </Card>
  );
}
