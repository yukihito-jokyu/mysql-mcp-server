import mysql from "mysql2/promise";

export async function select(connect: mysql.Connection) {
  try {
    const [results, fields] = await connect.query(
      "SELECT * FROM users"
    );
  } catch (err) {
    console.error(err);
  }
};

export async function listTables(connect: mysql.Connection): Promise<string> {
  try {
    const [rows] = await connect.query("SHOW TABLES");
    const tables = (rows as any[]).map((row) => Object.values(row)[0]);
    return tables.join(", ");
  } catch (error) {
    console.error("Error listing tables:", error);
    throw error;
  }
}
