import { useState, useEffect } from 'react';
import { Box, Typography, Container, Button, Paper, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import ApiKeyInfo from '../components/dashboard/ApiKeyInfo';
const DashboardPage = () => {
  const { user, apiKey, generateApiKey } = useAuth();
  const [notification, setNotification] = useState(null);

  const handleGenerateApiKey = async () => {
    try {
      await generateApiKey();
      setNotification({ message: 'API key generated successfully!', severity: 'success' });
    } catch (error) {
      setNotification({ message: 'Failed to generate API key', severity: 'error' });
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'white', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
          Welcome, {user?.username}!
        </Typography>
        
        {notification && (
          <Alert severity={notification.severity} sx={{ mb: 2 }}>
            {notification.message}
          </Alert>
        )}

        <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            API Key Management
          </Typography>
          {apiKey ? (
            <ApiKeyInfo />
          ) : (
            <Box sx={{ mt: 2 }}>
              <Typography paragraph>
                You don't have an active API key. Generate one to start using the Countries API.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleGenerateApiKey}
                sx={{ fontWeight: 'bold' }}
              >
                Generate API Key
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default DashboardPage;