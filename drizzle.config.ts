import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

export default defineConfig({
  out: './drizzle',
  schema: [
    './src/features/User/schema.ts',
    './src/features/Department/schema.ts',
    './src/features/Transfer/schema.ts',
    './src/features/Role/schema.ts',
    './src/features/Maintenance/schema.ts',
    './src/features/Rate/schema.ts',
    './src/features/Technician/schema.ts',
    './src/features/Equipment/schema.ts',
    './src/features/Downtime/schema.ts'
  ],
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dbname',
    ssl: process.env.NODE_ENV === 'development-local' ? false : { rejectUnauthorized: false }
  }
});
