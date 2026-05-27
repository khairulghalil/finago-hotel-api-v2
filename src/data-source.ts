import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'finago_hotel',
  entities: ['src/entities/*.{ts,js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: false, // Set to true to auto-run migrations on app start
});
