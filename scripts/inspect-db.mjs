import fs from "fs";
import mysql from "mysql2/promise";

function loadEnvFile() {
  if (!fs.existsSync(".env")) return;

  for (const line of fs.readFileSync(".env", "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}

async function inspectDatabase(label, uri) {
  if (!uri) return;

  const connection = await mysql.createConnection(uri);
  const [databaseRows] = await connection.query("SELECT DATABASE() AS name");
  const databaseName = databaseRows[0]?.name;
  console.log(`\n${label}: ${databaseName}`);

  const [tables] = await connection.query(
    "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() ORDER BY TABLE_NAME"
  );

  for (const { TABLE_NAME: tableName } of tables) {
    const [countRows] = await connection.query(`SELECT COUNT(*) AS count FROM \`${tableName}\``);
    console.log(`\n- ${tableName} (${countRows[0]?.count ?? 0} rows)`);

    const [columns] = await connection.query(
      "SELECT COLUMN_NAME, DATA_TYPE FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? ORDER BY ORDINAL_POSITION",
      [tableName]
    );
    console.log(`  ${columns.map((column) => `${column.COLUMN_NAME}:${column.DATA_TYPE}`).join(", ")}`);
  }

  await connection.end();
}

loadEnvFile();

await inspectDatabase("DATABASE_URL", process.env.DATABASE_URL);
if (process.env.DATABASE2_URL && process.env.DATABASE2_URL !== process.env.DATABASE_URL) {
  await inspectDatabase("DATABASE2_URL", process.env.DATABASE2_URL);
}
