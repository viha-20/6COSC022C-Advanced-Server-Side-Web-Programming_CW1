import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ 
      py: 3, 
      backgroundColor: 'rgba(25, 118, 210, 0.9)',
      color: 'white',
      backdropFilter: 'blur(5px)'
    }}>
      <Typography variant="body1" align="center" sx={{ fontWeight: 'bold' }}>
        Copyright &copy; {new Date().getFullYear()} | Vihangi Devthilini Jayasekara
      </Typography>
    </Box>
  );
};

export default Footer;