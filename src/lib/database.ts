import mysql from "mysql2/promise";

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

export async function getTableSchema(
  connect: mysql.Connection,
  tableName: string
): Promise<string> {
  try {
    const [rows] = await connect.query("DESCRIBE ??", [tableName]);
    return JSON.stringify(rows, null, 2);
  } catch (error) {
    console.error(`Error getting schema for table ${tableName}:`, error);
    throw error;
  }
}

export async function getTableData(
  connect: mysql.Connection,
  tableName: string
): Promise<string> {
  try {
    const [rows] = await connect.query("SELECT * FROM ?? LIMIT 5", [tableName]);
    return JSON.stringify(rows, null, 2);
  } catch (error) {
    console.error(`Error getting data for table ${tableName}:`, error);
    throw error;
  }
}
