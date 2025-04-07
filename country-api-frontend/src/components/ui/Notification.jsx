import { Alert } from '@mui/material';

const Notification = ({ message, severity = 'info' }) => {
  if (!message) return null;
  
  return (
    <Alert severity={severity} sx={{ mb: 2 }}>
      {message}
    </Alert>
  );
};

export default Notification;