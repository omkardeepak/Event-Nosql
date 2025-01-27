import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Event-Management',
  password: 'hamburg4738',
  port: 5432, // default port for PostgreSQL
});

export default pool;