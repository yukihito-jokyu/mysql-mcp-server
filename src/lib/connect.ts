import mysql from "mysql2/promise";

type options = {
  host: string;
  port: string;
  name: string;
  password: string;
  database: string;
}

export async function connect(options: options): Promise<mysql.Connection | undefined> {
  const parsedPort = parseInt(options.port, 10);
  if (isNaN(parsedPort)) {
    return undefined;
  };
  const connect = await mysql.createConnection({
    host: options.host,
    port: parsedPort,
    user: options.name,
    password: options.password,
    database: options.database,
  });
  return connect;
}