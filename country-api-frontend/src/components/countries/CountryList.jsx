import { Grid } from '@mui/material';
import CountryCard from './CountryCard';

const CountryList = ({ countries }) => {
  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {countries.map((country) => (
        <Grid item key={country.name} xs={12} sm={6} md={4} lg={3}>
          <CountryCard country={country} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CountryList;