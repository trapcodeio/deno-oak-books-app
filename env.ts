import { load } from "https://deno.land/std@0.188.0/dotenv/mod.ts";

// load .env file
await load({ export: true });

/**
 * Define and export ENVS
 */
export const env = {
  DENO_ENV: Deno.env.get("DENO_ENV") || "development",

  APP_PORT: Number(Deno.env.get("APP_PORT") || 9000),

  POSTGRES_HOST: Deno.env.get("POSTGRES_HOST") || "localhost",
  POSTGRES_PORT: Number(Deno.env.get("POSTGRES_PORT") || 5432),
  POSTGRES_DB: Deno.env.get("POSTGRES_DB") || "books",
  POSTGRES_USER: Deno.env.get("POSTGRES_USER") || "postgres",
  POSTGRES_PASSWORD: Deno.env.get("POSTGRES_PASSWORD"),
};

// Log Current Environment
console.log(`Environment: [${env.DENO_ENV}]`);

// Shorthand for checking if environment is development
export const IS_DEV = env.DENO_ENV === "development";

// export env
export default env;
