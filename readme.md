# Deno Oak Books App

A simple Books App API using **Deno** and **Oak Framework**

# Stack

## Backend

- [Deno](https://deno.land/)
- [Oak](https://github.com/oakserver/oak)
- [PostgreSQL](https://www.postgresql.org/)

## Frontend

- [vue-books-app](https://github.com/trapcodeio/vue-books-app)

# Setup

Make sure you have Deno installed on your machine. If not, you can install it
from [here](https://deno.land/#installation).

By default, this should work without an `env` file. If you want to change the
default values, create a `.env` file in the root of the project.

```bash
# Create .env file
cp .env.example .env
```

Then start the app.

```bash
# Run the app and watch for changes
deno task dev

# Run the app but debug it without watching for changes
deno task debug

# Run the app
deno task start
```

These commands can be found in the `deno.json` file.

# Docker

You can also run the app using Docker. The docker-compose file exists in
`.docker` folder.

```bash
cd .docker

# Build the app (only needed once)
docker compose up --build -d

# Run the app
docker compose up -d
```
