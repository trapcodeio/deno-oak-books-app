import { Client } from "postgres";
import env from "../env.ts";

// initialize the database
const client = new Client({
  user: env.POSTGRES_USER,
  database: env.POSTGRES_DB,
  hostname: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
});

// Connect to the database
await client.connect();

// log database connection
console.log(`Connected to database [${env.POSTGRES_DB}]`);

// export initialized database
export default client;
