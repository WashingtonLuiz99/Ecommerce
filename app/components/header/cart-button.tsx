'use client';

import Link from 'next/link';

import { useCart } from '@/app/hooks/cart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton } from '@mui/material';

export default function CartButton() {
  const { cart } = useCart();

  return (
    <IconButton
      color="inherit"
      aria-label="add to shopping cart"
      size="large"
      LinkComponent={Link}
      href="/carrinho"
    >
      <Badge badgeContent={cart?.cart_items.length} color="error">
        <ShoppingCartIcon fontSize="inherit" />
      </Badge>
    </IconButton>
  );
}
