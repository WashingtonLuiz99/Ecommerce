'use client';

import React from 'react';

import { CartProvider } from './cart';

import { SnackbarProvider } from 'notistack';

export interface IAppProvider {
  children: React.ReactNode;
}

const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={2000}
    >
      <CartProvider>{children}</CartProvider>
    </SnackbarProvider>
  );
};

export default AppProvider;
