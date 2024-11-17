import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const db = drizzle(pool);

// Function to test the database connection
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully');
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

testConnection();

export { db };
