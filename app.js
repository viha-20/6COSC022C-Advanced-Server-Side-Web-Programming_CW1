const express = require('express');
const authRoutes = require('./routes/authRoutes');
const apiKeyRoutes = require('./routes/apiKeyRoutes');
const countryRoutes = require('./routes/countryRoutes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', apiKeyRoutes);
app.use('/api', countryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));