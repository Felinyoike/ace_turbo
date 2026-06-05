import mysql from "mysql2/promise";

const remoteUri = "mysql://u267913486_khalid1962:Tendril1962@srv1371.hstgr.io:3306/u267913486_aceturbo_new";

try {
  console.log("Connecting to remote Hostinger MySQL...");
  const conn = await mysql.createConnection(remoteUri);
  console.log("Connected successfully!");
  const [rows] = await conn.query("SELECT DATABASE(), USER()");
  console.log("Database & User:", rows);
  await conn.end();
} catch (err) {
  console.error("Connection failed:", err);
}
