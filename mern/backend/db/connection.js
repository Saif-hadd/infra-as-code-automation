import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.POSTGRES_HOST || "postgres",
  port: process.env.POSTGRES_PORT || 5432,
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "saifeddine",
  database: process.env.POSTGRES_DB || "test",
});

export default pool;
