import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Represents a singleton encapsulation of a database connection.
 * This class is used to manage the database connection, ensuring only a single instance exists and providing methods to access and close the connection.
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

/**
 * Represents the active database connection instance, which is accessed
 * through the singleton instance of the Database class.
 *
 * This variable provides an interface to interact with the connected
 * database, allowing operations such as queries, updates, and transactions.
 *
 * Proper initialization of the `Database` singleton is required before
 * accessing this variable to ensure a valid connection is established.
 */
const db = Database.getInstance().db;

export { db };
