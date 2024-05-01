import Copyright from '@/app/components/copyright';
import Header from '@/app/components/header';
import { Box, Container } from '@mui/material';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box flexGrow={1}>{children}</Box>
      <Copyright />
    </div>
  );
}
