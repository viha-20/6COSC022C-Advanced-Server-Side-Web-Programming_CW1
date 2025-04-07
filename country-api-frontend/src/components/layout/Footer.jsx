import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, bgcolor: 'primary.main', color: 'white' }}>
      <Typography variant="body1" align="center">
        Country Explorer &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;