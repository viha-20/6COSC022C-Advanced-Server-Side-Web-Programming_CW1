// import { Card, CardContent, CardMedia, Typography, Chip, Stack } from '@mui/material';

// const CountryCard = ({ country }) => {
//   return (
//     <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//       <CardMedia
//         component="img"
//         height="140"
//         image={country.flag}
//         alt={`Flag of ${country.name}`}
//       />
//       <CardContent sx={{ flexGrow: 1 }}>
//         <Typography gutterBottom variant="h5" component="div">
//           {country.name}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" paragraph>
//           Capital: {country.capital}
//         </Typography>
        
//         <Typography variant="body2" paragraph>
//           Languages:
//         </Typography>
//         <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//           {country.languages.map((lang) => (
//             <Chip key={lang} label={lang} size="small" />
//           ))}
//         </Stack>
        
//         <Typography variant="body2" paragraph>
//           Currencies:
//         </Typography>
//         <Stack direction="row" spacing={1}>
//           {country.currencies.map((curr) => (
//             <Chip key={curr} label={curr} size="small" />
//           ))}
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// };

// export default CountryCard;


import { Card, CardContent, CardMedia, Typography, Chip, Stack, Box } from '@mui/material';

const CountryCard = ({ country }) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(4px)',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
      }
    }}>
      {/* Flag Image Container */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 160,
        p: 2,
        backgroundColor: '#f5f5f5'
      }}>
        <CardMedia
          component="img"
          sx={{ 
            height: 'auto',
            maxHeight: '100%',
            width: 'auto',
            maxWidth: '100%',
            objectFit: 'contain'
          }}
          image={country.flag}
          alt={`Flag of ${country.name}`}
        />
      </Box>
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          gutterBottom 
          variant="h5" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#1976d2'
          }}
        >
          {country.name}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 1.5,
          justifyContent: 'center'
        }}>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: '500',
              mr: 1,
              color: 'text.secondary'
            }}
          >
            Capital:
          </Typography>
          <Typography variant="body1">
            {country.capital || 'N/A'}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: '500',
              textAlign: 'center',
              mb: 1,
              color: 'text.secondary'
            }}
          >
            Languages:
          </Typography>
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            {country.languages.map((lang) => (
              <Chip 
                key={lang} 
                label={lang} 
                size="small" 
                sx={{ 
                  mb: 1, 
                  backgroundColor: '#e3f2fd',
                  fontWeight: '500'
                }}
              />
            ))}
          </Stack>
        </Box>
        
        <Box>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: '500',
              textAlign: 'center',
              mb: 1,
              color: 'text.secondary'
            }}
          >
            Currencies:
          </Typography>
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            {country.currencies.map((curr) => (
              <Chip 
                key={curr} 
                label={curr} 
                size="small" 
                sx={{ 
                  mb: 1, 
                  backgroundColor: '#e8f5e9',
                  fontWeight: '500'
                }}
              />
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CountryCard;