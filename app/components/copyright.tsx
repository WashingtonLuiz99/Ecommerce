import Link from 'next/link';

import { Box, Typography } from '@mui/material';

export default function Copyright() {
  return (
    <Box
      component="section"
      py={3}
      bgcolor="#1976d2"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Link
        href="https://www.linkedin.com/in/washington-luiz"
        style={{
          color: '#fff',
        }}
      >
        <Typography variant="h5" textAlign="center">
          Developed by Washington Luiz
        </Typography>
      </Link>
    </Box>
  );
}
