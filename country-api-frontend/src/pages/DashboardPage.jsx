import { useState, useEffect } from 'react';
import { Box, Typography, Container, Button, Paper, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import ApiKeyInfo from '../components/dashboard/ApiKeyInfo';
import UsageStats from '../components/dashboard/UsageStats';

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

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.username}!
        </Typography>
        
        {notification && (
          <Alert severity={notification.severity} sx={{ mb: 2 }}>
            {notification.message}
          </Alert>
        )}

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
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
              >
                Generate API Key
              </Button>
            </Box>
          )}
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Usage Statistics
          </Typography>
          <UsageStats />
        </Paper>
      </Box>
    </Container>
  );
};

export default DashboardPage;