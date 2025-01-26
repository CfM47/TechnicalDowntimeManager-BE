import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Singleton class to manage the database connection using drizzle-orm and pg.
 *
 * This class ensures that only one instance of the database connection is created
 * and provides methods to get the instance and close the connection.
 */
class Database {
  private static instance: Database;
  private readonly pool: Pool;
  public db: ReturnType<typeof drizzle>;

  private constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'dbname',
      ssl: process.env.NODE_ENV === 'development-local' ? false : { rejectUnauthorized: false }
    });

    this.db = drizzle(this.pool, {
      logger: true
    });
  }

  /**
   * Returns the singleton instance of the Database class.
   *
   * @returns The singleton instance of the Database class.
   */
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  /**
   * Closes the database connection.
   */
  public async closeConnection() {
    await this.pool.end();
  }
}

const db = Database.getInstance().db;

export { db };