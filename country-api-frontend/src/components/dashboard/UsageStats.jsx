import { Typography, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const UsageStats = () => {
  // In a real app, you would fetch these stats from your backend
  return (
    <Box>
      <Typography paragraph>
        Usage statistics will be displayed here once you start using the API.
      </Typography>
    </Box>
  );
};

export default UsageStats;