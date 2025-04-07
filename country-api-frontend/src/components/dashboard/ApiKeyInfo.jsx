import { Typography, Box, TextField, Button, Alert } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ApiKeyInfo = () => {
  const { apiKey } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box>
      <Typography paragraph>
        Your API key is required to access the Countries API. Keep it secure and don't share it with others.
      </Typography>
      
      <TextField
        value={apiKey}
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleCopy}>
          Copy API Key
        </Button>
        {copied && (
          <Alert severity="success" sx={{ mt: 2 }}>
            API key copied to clipboard!
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default ApiKeyInfo;