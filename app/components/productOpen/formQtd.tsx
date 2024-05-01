'use client';

import { useCallback, useEffect, useState } from 'react';

import DialogRemoveItemCart from '../dialog-remove-item-cart';

import { useCart } from '@/app/hooks/cart';
import { type IProduct } from '@/app/interfaces/IProduct';
import type ICartItem from '@/app/interfaces/IProductCart';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';

export default function FormQtd({ data }: { data: IProduct }) {
  const { getProductCart, deleteCartItem, updateCartItemAmount, addCartItem } =
    useCart();
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [productInCart, setProductInCart] = useState<ICartItem | undefined>();
  const [qtd, setQtd] = useState(productInCart?.amount || 0);

  useEffect(() => {
    if (data?.id) {
      const productCart = getProductCart(data.id);
      setProductInCart(productCart);
      if (productCart?.amount) setQtd(productCart?.amount);
    }
  }, [data?.id, getProductCart]);

  const handleDialog = useCallback(
    (param: boolean) => {
      setOpenDialog(false);

      if (param) {
        setLoadingDelete(true);
        const response = deleteCartItem(data.id);

        if (response?.error) {
          enqueueSnackbar(response?.error, {
            variant: 'error',
          });
        } else {
          enqueueSnackbar('Item added to cart.', {
            variant: 'success',
          });
        }

        setLoadingDelete(false);
      }
    },
    [data?.id, deleteCartItem, enqueueSnackbar],
  );

  const handleCart = useCallback(() => {
    let result;
    if (productInCart) {
      result = updateCartItemAmount(data.id, qtd);
    } else {
      const response = {
        amount: Number(1),
        value: data.price,
        stock: {
          id: data.id,
          title: data.title,
          value: data.price,
          image: data.image,
        },
      };

      result = addCartItem(response);
    }

    if (result?.error) {
      enqueueSnackbar(result?.error, {
        variant: 'error',
      });
    } else {
      enqueueSnackbar('Success', {
        variant: 'success',
      });
    }
  }, [
    addCartItem,
    data?.id,
    data?.image,
    data?.price,
    data?.title,
    productInCart,
    qtd,
    updateCartItemAmount,
    enqueueSnackbar,
  ]);

  const handleQtd = useCallback((qtdParam: number) => {
    setQtd(qtdParam);
  }, []);

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        gap={4}
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
          value={qtd}
          onChange={e => {
            handleQtd(Number(e.target.value));
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button variant="contained" onClick={handleCart}>
          to add
        </Button>

        {!!productInCart && (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            {!loadingDelete ? 'Remove from cart' : <CircularProgress />}
          </Button>
        )}
      </Box>

      <DialogRemoveItemCart
        open={openDialog}
        handleDialog={handleDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      />
    </>
  );
}
