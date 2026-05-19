# Finago Hotel API - Quick Start Guide

## Prerequisites
- Node.js (v20.11 or higher recommended)
- MySQL (v8.0 or higher)
- npm or yarn

## Initial Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update the database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=finago_hotel
   ```

3. **Create the database:**
   ```sql
   CREATE DATABASE finago_hotel;
   ```

4. **Run the application:**
   ```bash
   npm run start:dev
   ```

   The API will be available at: http://localhost:3000/api/v1

## Test the API

1. **Check health:**
   ```bash
   curl http://localhost:3000/api/v1/health
   ```

2. **Create a hotel:**
   ```bash
   curl -X POST http://localhost:3000/api/v1/hotels \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test Hotel",
       "address": "123 Main St",
       "city": "New York",
       "country": "USA"
     }'
   ```

3. **Get all hotels:**
   ```bash
   curl http://localhost:3000/api/v1/hotels
   ```

## Development Tips

- Use `npm run start:dev` for hot-reload during development
- Check the `api.http` file for more API examples
- Run tests with `npm test`

## Project Structure

```
src/
├── common/           # Shared components (filters, interceptors, pipes, base entities)
├── config/           # Configuration files
├── modules/          # Feature modules (hotels, etc.)
├── app.module.ts     # Root module
└── main.ts           # Application bootstrap
```

## Need Help?

- Check the main README.md for detailed documentation
- Review the code comments
- Test endpoints using the api.http file
