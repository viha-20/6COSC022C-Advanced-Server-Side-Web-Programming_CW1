import { Card, CardContent, CardMedia, Typography, Chip, Stack } from '@mui/material';

const CountryCard = ({ country }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={country.flag}
        alt={`Flag of ${country.name}`}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {country.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Capital: {country.capital}
        </Typography>
        
        <Typography variant="body2" paragraph>
          Languages:
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {country.languages.map((lang) => (
            <Chip key={lang} label={lang} size="small" />
          ))}
        </Stack>
        
        <Typography variant="body2" paragraph>
          Currencies:
        </Typography>
        <Stack direction="row" spacing={1}>
          {country.currencies.map((curr) => (
            <Chip key={curr} label={curr} size="small" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CountryCard;