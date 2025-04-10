import { useState, useEffect } from 'react';
import { Box, Typography, Container, CircularProgress, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import CountryList from '../components/countries/CountryList';
import CountrySearch from '../components/countries/CountrySearch';
import countriesService from '../api/countries';

const CountriesPage = () => {
  const { apiKey } = useAuth();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      if (!apiKey) return;
      
      try {
        setLoading(true);
        const response = await countriesService.getAllCountries(apiKey);
        setCountries(response.data.countries);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch countries');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [apiKey]);

  const handleSearch = async (countryName) => {
    if (!apiKey) return;
    
    try {
      setLoading(true);
      const response = await countriesService.getCountryByName(countryName, apiKey);
      setCountries([response.data.country]);
    } catch (err) {
      setError(err.response?.data?.message || 'Country not found');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'white', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
          Countries
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <CountrySearch onSearch={handleSearch} disabled={!apiKey || loading} />
          
          {!apiKey && (
            <Typography color="error" paragraph>
              Please generate an API key in your dashboard to access country data.
            </Typography>
          )}
          
          {error && (
            <Typography color="error" paragraph>
              {error}
            </Typography>
          )}
        </Paper>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <CountryList countries={countries} />
        )}
      </Box>
    </Container>
  );
};

export default CountriesPage;