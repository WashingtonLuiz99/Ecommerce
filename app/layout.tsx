import type { Metadata } from 'next';

import AppProvider from '@/app/hooks';
import theme from '@/app/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

export const metadata: Metadata = {
  title: 'WL Ecommerce',
  description: 'Washington Luiz Ecommerce',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <AppProvider>
            <CssBaseline />
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
