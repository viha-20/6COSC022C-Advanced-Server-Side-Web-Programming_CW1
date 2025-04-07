# 6COSC022C-Advanced-Server-Side-Web-Programming_CW1
# Country Information API Middleware

A secure API middleware service that interfaces with RestCountries.com, providing filtered country data with authentication and API key management.

## Features

- User registration and login with JWT authentication
- API key generation and management
- Secure storage of user credentials with password hashing
- Session management with cookies
- API key usage tracking
- Integration with RestCountries.com API
- Filtered country data response (name, currency, capital, languages, flag)

## Technologies

- Node.js
- Express.js
- SQLite3 with Sequelize ORM
- JWT for authentication
- Bcrypt for password hashing
- Axios for HTTP requests
- Docker for containerization

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/country-api-middleware.git
   cd country-api-middleware