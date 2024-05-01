'use client';

import { useCallback, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useCart } from '../hooks/cart';
import { type IProduct } from '../interfaces/IProduct';
import { formatCurrency } from '../lib/utils';

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';

export default function CardProduct({ id, title, image, price }: IProduct) {
  const { addCartItem } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleAddCart = useCallback(() => {
    setLoading(true);
    try {
      const response = {
        amount: Number(1),
        value: price,
        stock: {
          id,
          title,
          value: price,
          image,
        },
      };
      const result = addCartItem(response);

      if (!result.success) {
        console.log(result);
        throw new Error(result?.error);
      } else {
        enqueueSnackbar('Item adicionado no carrinho.', {
          variant: 'success',
        });
      }
    } catch (err: any) {
      enqueueSnackbar(
        `${err.message}` ?? 'Ocorreu um erro ao atualizar o carrinho',
        {
          variant: 'error',
        },
      );
    } finally {
      setLoading(false);
    }
  }, [addCartItem, enqueueSnackbar, id, image, price, title]);

  return (
    <Card
      sx={{
        maxWidth: 336,
        width: '100%',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea LinkComponent={Link} href={`/produto/${id}`}>
        <Image
          src={image}
          placeholder="blur"
          blurDataURL={image}
          alt={`Imagem do produto ${title}`}
          width={336}
          height={336}
          style={{
            width: '100%',
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
          flexDirection="column"
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
            {title}
          </Typography>

          <Typography variant="body1" fontSize={20}>
            {formatCurrency(price)}
          </Typography>

          <Button
            variant="contained"
            sx={{ width: '100%' }}
            onClick={handleAddCart}
          >
            {!loading ? 'Adicionar' : <CircularProgress />}
          </Button>
        </Box>
      </CardActionArea>
    </Card>
  );
}
