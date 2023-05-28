import {Client} from "postgres";
import env from "../env.ts";

// initialize the database
const client = new Client({
    user: env.POSTGRES_USER,
    database: env.POSTGRES_DB,
    hostname: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
});

try {
    // Connect to the database
    await client.connect();
} catch (error) {
    // log error
    console.log(`Failed to connect to database [${env.POSTGRES_HOST}]`);
    console.log(error.message);

    // exit process
    Deno.exit(1);
}


// log database connection
console.log(`Connected to database [${env.POSTGRES_DB}]`);

// export initialized database
export default client;
