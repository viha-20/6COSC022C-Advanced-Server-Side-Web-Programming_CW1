import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          The page you are looking for does not exist.
        </Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;