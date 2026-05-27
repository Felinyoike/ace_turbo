import mysql from "mysql2/promise";

const globalForMysql = globalThis as unknown as { pool?: mysql.Pool; carPool?: mysql.Pool };

export const pool = globalForMysql.pool ?? mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const carPool = process.env.DATABASE2_URL
  ? (globalForMysql.carPool ?? mysql.createPool({
      uri: process.env.DATABASE2_URL,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    }))
  : pool;

if (process.env.NODE_ENV !== "production") {
  globalForMysql.pool = pool;
  globalForMysql.carPool = carPool;
}
