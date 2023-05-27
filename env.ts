import { load } from "https://deno.land/std@0.188.0/dotenv/mod.ts";

// load .env file
const e = await load({ export: true });

/**
 * Define and export ENVS
 */
export const env = {
  DENO_ENV: e["DENO_ENV"] || "development",

  APP_HOST: e["APP_HOST"] || "127.0.0.1",
  APP_PORT: Number(e["APP_PORT"] || 9000),

  POSTGRES_HOST: e["POSTGRES_HOST"] || "localhost",
  POSTGRES_PORT: Number(e["POSTGRES_PORT"] || 5432),
  POSTGRES_DB: e["POSTGRES_DB"] || "books",
  POSTGRES_USER: e["POSTGRES_USER"] || "postgres",
  POSTGRES_PASSWORD: e["POSTGRES_PASSWORD"],
};

// Log Current Environment
console.log(`Environment: [${env.DENO_ENV}]`);

// SHorthand for checking if environment is development
export const IS_DEV = env.DENO_ENV === "development";

// export env
export default env;
