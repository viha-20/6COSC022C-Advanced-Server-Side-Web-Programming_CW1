// import { Box } from '@mui/material';
// import Header from './Header';
// import Footer from './Footer';

// const MainLayout = ({ children }) => {
//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <Header />
//       <Box component="main" sx={{ flexGrow: 1 }}>
//         {children}
//       </Box>
//       <Footer />
//     </Box>
//   );
// };

// export default MainLayout;


import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import worldMap from '../../assets/images/world-map.jpg';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundImage: `url(${worldMap})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        zIndex: -1
      }
    }}>
      <Header />
      <Box component="main" sx={{ 
        flexGrow: 1,
        position: 'relative',
        zIndex: 1,
        py: 4
      }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;