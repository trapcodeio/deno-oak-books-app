# Dev stage
FROM denoland/deno:alpine AS dev

WORKDIR /usr/src/app

# Needed for VS Code Remote Development
RUN apk add musl libgcc libstdc++ git curl wget bash ca-certificates openssh-client

COPY . .

USER deno
RUN deno cache server.ts

EXPOSE 9000

CMD ["deno", "task", "start"]

# Prod stage
FROM denoland/deno:alpine AS prod

WORKDIR /usr/src/app

COPY . .

USER deno
RUN deno cache server.ts

EXPOSE 9000

CMD ["deno", "task", "start"]
