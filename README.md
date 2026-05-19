# Finago Hotel API

A scalable RESTful API built with **Node.js**, **TypeScript**, **NestJS**, and **TypeORM**.

## 🚀 Features

- **NestJS Framework**: Modular architecture with dependency injection
- **TypeScript**: Strong typing and enhanced code quality
- **TypeORM**: Powerful ORM with MySQL support
- **Validation**: Built-in request validation using class-validator
- **Error Handling**: Global exception filters
- **Response Transformation**: Consistent API response format
- **Environment Configuration**: Centralized config management
- **Soft Delete**: Built-in soft delete functionality
- **CORS**: Configured Cross-Origin Resource Sharing

## 📁 Project Structure

```
src/
├── common/              # Shared utilities
│   ├── entities/        # Base entities
│   ├── filters/         # Exception filters
│   ├── interceptors/    # Response interceptors
│   └── pipes/           # Validation pipes
├── config/              # Configuration files
│   ├── app.config.ts    # Application config
│   └── database.config.ts # Database config
├── modules/             # Feature modules
│   └── hotels/          # Hotel module
│       ├── dto/         # Data Transfer Objects
│       ├── entities/    # TypeORM entities
│       ├── hotels.controller.ts
│       ├── hotels.service.ts
│       └── hotels.module.ts
├── app.module.ts        # Root module
└── main.ts              # Application entry point
```

## 🛠️ Installation

```bash
# Install dependencies
npm install
```

## ⚙️ Configuration

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Update the `.env` file with your database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=finago_hotel
DB_LOGGING=false
DB_SYNCHRONIZE=false
```

## 🏃 Running the Application

```bash
# Development mode
npm run dev

# Production mode
npm run start:prod
```

## 📡 API Endpoints

### Hotels

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/v1/hotels`     | Create a new hotel         |
| GET    | `/api/v1/hotels`     | Get all hotels             |
| GET    | `/api/v1/hotels/:id` | Get hotel by ID            |
| PATCH  | `/api/v1/hotels/:id` | Update hotel               |
| DELETE | `/api/v1/hotels/:id` | Delete hotel (soft delete) |

### Example Request

**Create Hotel:**

```bash
curl -X POST http://localhost:3000/api/v1/hotels \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Grand Hotel",
    "description": "Luxury 5-star hotel",
    "address": "123 Main Street",
    "city": "New York",
    "country": "USA",
    "phone": "+1234567890",
    "email": "info@grandhotel.com",
    "rating": 5,
    "isActive": true
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Request successful",
  "data": {
    "id": "uuid",
    "name": "Your Name"
  }
}
```

## 📚 Technology Stack

- **Node.js** - JavaScript runtime
- **TypeScript** - Static typing
- **NestJS** - Progressive Node.js framework
- **TypeORM** - ORM for TypeScript and JavaScript
- **MySQL** - Relational database
- **class-validator** - Validation decorators
- **class-transformer** - Object transformation

## 📝 Additional Notes

- **Database Synchronization**: Enabled in development mode (disable in production)
- **Soft Delete**: Deleted entities are not removed but marked with `deletedAt` timestamp
- **UUID**: Using UUIDs for primary keys
- **Timestamps**: Automatic `createdAt` and `updatedAt` tracking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is [MIT licensed](LICENSE).
