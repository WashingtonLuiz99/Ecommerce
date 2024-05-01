import Image from 'next/image';

import CartButton from './cart-button';

import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static" component="header">
      <Toolbar sx={{ py: 2, px: 4, gap: 4 }}>
        <Image
          alt="Mountains"
          src="/logo.png"
          width={60}
          height={60}
          style={{
            borderRadius: 55,
            objectPosition: 'center',
            objectFit: 'cover',
          }}
        />

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Produtos
        </Typography>

        <CartButton />
      </Toolbar>
    </AppBar>
  );
}
