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
