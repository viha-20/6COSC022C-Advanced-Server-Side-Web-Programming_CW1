# Secure API Middleware Service

The application acts as an intermediary layer between clients and the RestCountries API, providing filtered country data while enforcing strong authentication and API key security.

📌 Features
🔐 Authentication

User registration
Secure login
Password hashing (bcrypt)
Session management using cookies

🔑 API Key System

Generate unique API keys
Revoke API keys
API key validation middleware
Secure storage in SQLite

🌍 RestCountries API Integration

Returns filtered country information:
Country name
Capital
Currency
Languages
National flag

🗄️ SQLite Database

Users table
API keys table
Designed with 3NF structure
Stores hashed sensitive data
