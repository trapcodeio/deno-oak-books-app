import { Client } from "postgres";
import env from "../env.ts";

// initialize the database
const client = new Client({
    user: env.POSTGRES_USER,
    database: env.POSTGRES_DB,
    hostname: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    password: env.POSTGRES_PASSWORD
});

try {
    // Connect to the database
    await client.connect();

    // check if db table exists
    const result = await client.queryArray(
        `SELECT * FROM pg_catalog.pg_tables WHERE tablename = '${env.POSTGRES_DB}'`
    );

    // if table does not exist
    if (result.rowCount === 0) {
        // get sql query from "sql/create_books_table.sql" file
        const query = await Deno.readTextFile("./database/sql/create_books_table.sql");

        // create table.
        await client.queryArray(query);
    }
} catch (error) {
    // log error
    console.log(`Failed to connect to database [${env.POSTGRES_HOST}]`);
    console.log(error);

    // exit process
    Deno.exit(1);
}

// log database connection
console.log(`Connected to database [${env.POSTGRES_DB}]`);

// export initialized database
export default client;
