// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Box, Typography, Container } from '@mui/material';
// import LoginForm from '../components/auth/LoginForm';
// import Notification from '../components/ui/Notification';

// const LoginPage = () => {
//   const [error, setError] = useState(null);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (values) => {
//     try {
//       await login(values);
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 8, mb: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Login
//         </Typography>
//         {error && <Notification message={error} severity="error" />}
//         <LoginForm onSubmit={handleSubmit} />
//       </Box>
//     </Container>
//   );
// };

// export default LoginPage;



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, Container, Paper } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import Notification from '../components/ui/Notification';

const LoginPage = () => {
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await login(values);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            Login
          </Typography>
          {error && <Notification message={error} severity="error" />}
          <LoginForm onSubmit={handleSubmit} />
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;