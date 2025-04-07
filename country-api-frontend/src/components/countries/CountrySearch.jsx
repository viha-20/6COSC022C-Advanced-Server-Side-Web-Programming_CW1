import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const CountrySearch = ({ onSearch, disabled }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search country by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={disabled}
        sx={{ mr: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={disabled || !searchTerm.trim()}
        sx={{ mt: { xs: 2, sm: 0 } }}
      >
        Search
      </Button>
    </Box>
  );
};

export default CountrySearch;