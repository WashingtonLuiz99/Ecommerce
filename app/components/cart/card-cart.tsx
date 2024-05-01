'use client';

import { useCallback, useState } from 'react';

import Image from 'next/image';

import { formatCurrency } from '@/app/lib/utils';

import { useCart } from '@/app/hooks/cart';
import type ICartItem from '@/app/interfaces/IProductCart';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
export default function CardCart({ id, amount, stock }: ICartItem) {
  const { deleteCartItem, updateCartItemAmount } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  const [qtd, setQtd] = useState(amount);
  const subtotal = stock.value * qtd;

  const handleQtd = useCallback(
    (qtdParam: number) => {
      setQtd(qtdParam);
      updateCartItemAmount(stock.id, qtdParam);
    },
    [stock?.id, updateCartItemAmount],
  );

  const handleDeleteCartItem = useCallback(() => {
    const result = deleteCartItem(stock.id);

    if (!result.success) {
      enqueueSnackbar(result.error, {
        variant: 'success',
      });
    }
  }, [stock.id, deleteCartItem, enqueueSnackbar]);

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        gap: 4,
      }}
    >
      <Box flex={1} display="flex" flexDirection="column" gap={3}>
        <Box
          component="div"
          gap={4}
          flexDirection="row"
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          flex={1}
          sx={{
            '@media (max-width: 600px)': {
              flexDirection: 'column-reverse',
            },
          }}
        >
          <Box display="flex" flexDirection="row" gap={4}>
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

            <Box>
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

              <Typography variant="body1" fontSize={16}>
                {`Valor unitario: ${formatCurrency(stock.value)}`}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: 'min-content',
              '@media (max-width: 600px)': {
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              },
            }}
          >
            <Button color="error" onClick={handleDeleteCartItem}>
              <DeleteOutlineIcon fontSize="small" /> Remover
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        gap={4}
        width="100%"
        justifyContent="space-between"
        sx={{
          '@media (max-width: 600px)': {
            flexDirection: 'column',
          },
        }}
      >
        <TextField
          id="outlined-number"
          label="Quantidade"
          type="number"
          defaultValue={String(amount)}
          onChange={e => {
            handleQtd(Number(e.target.value));
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Typography
          variant="body1"
          fontWeight="bold"
          textAlign="right"
          fontSize={20}
        >
          {`Subtotal: ${formatCurrency(subtotal)}`}
        </Typography>
      </Box>
    </Card>
  );
}
