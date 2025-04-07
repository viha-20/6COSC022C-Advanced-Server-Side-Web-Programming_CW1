// import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Header = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//   };

//   return (
//     <AppBar position="static" sx={{ mb: 4 }}>
//       <Toolbar>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
//             Country Explorer
//           </Link>
//         </Typography>
//         <Box sx={{ display: 'flex', gap: 2 }}>
//           {user ? (
//             <>
//               <Button color="inherit" component={Link} to="/dashboard">
//                 Dashboard
//               </Button>
//               <Button color="inherit" component={Link} to="/countries">
//                 Countries
//               </Button>
//               <Button color="inherit" onClick={handleLogout}>
//                 Logout
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button color="inherit" component={Link} to="/login">
//                 Login
//               </Button>
//               <Button color="inherit" component={Link} to="/register">
//                 Register
//               </Button>
//             </>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ 
      mb: 4,
      backgroundColor: 'rgba(25, 118, 210, 0.9)',
      backdropFilter: 'blur(5px)'
    }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            🌍 Country Explorer
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard" sx={{ fontWeight: 'bold' }}>
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/countries" sx={{ fontWeight: 'bold' }}>
                Countries
              </Button>
              <Button 
                color="inherit" 
                onClick={handleLogout}
                sx={{ fontWeight: 'bold' }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login" sx={{ fontWeight: 'bold' }}>
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register" sx={{ fontWeight: 'bold' }}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;