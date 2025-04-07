// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Box, Typography, Container } from '@mui/material';
// import RegisterForm from '../components/auth/RegisterForm';
// import Notification from '../components/ui/Notification';

// const RegisterPage = () => {
//   const [error, setError] = useState(null);
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (values) => {
//     try {
//       console.log('Attempting to register:', values.email); // Debug log
//       const response = await register(values);
//       console.log('Registration response:', response); // Debug log
//       if (response && response.success) {
//         navigate('/login');
//       }
//     } catch (err) {
//       console.error('Registration error:', err); // Debug log
//       setError(err.message || 'Registration failed. Please try again.');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 8, mb: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Register
//         </Typography>
//         {error && (
//           <Notification 
//             message={error} 
//             severity="error" 
//             onClose={() => setError(null)}
//           />
//         )}
//         <RegisterForm onSubmit={handleSubmit} />
//       </Box>
//     </Container>
//   );
// };

// export default RegisterPage;



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, Container, Paper } from '@mui/material';
import RegisterForm from '../components/auth/RegisterForm';
import Notification from '../components/ui/Notification';

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await register(values);
      if (response && response.success) {
        navigate('/login', { state: { registrationSuccess: true } });
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        mt: 8, 
        mb: 4,
        minHeight: 'calc(100vh - 200px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Paper elevation={4} sx={{ 
          p: 4, 
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(8px)',
          borderRadius: 3
        }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ 
              fontWeight: 'bold',
              color: '#1976d2',
              mb: 3
            }}
          >
            Create Account
          </Typography>
          
          {error && (
            <Notification 
              message={error} 
              severity="error" 
              onClose={() => setError(null)}
              sx={{ mb: 3 }}
            />
          )}
          
          <RegisterForm onSubmit={handleSubmit} />
          
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ mt: 3, color: 'text.secondary' }}
          >
            Already have an account?{' '}
            <a 
              href="/login" 
              style={{ 
                color: '#1976d2',
                fontWeight: 'bold',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Sign In
            </a>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;