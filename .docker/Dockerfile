# Dev stage
FROM denoland/deno:alpine AS dev


ENV DENO_ENV=development

WORKDIR /usr/src/app

# Needed for VS Code Remote Development
RUN apk add musl libgcc libstdc++ git curl wget bash ca-certificates openssh-client

COPY . .

USER deno
RUN deno cache server.ts

EXPOSE 9000

CMD ["deno", "task", "dev"]

# Prod stage
FROM denoland/deno:alpine AS prod

ENV DENO_ENV=production

WORKDIR /usr/src/app

COPY . .

USER deno
RUN deno cache server.ts

EXPOSE 9000

CMD ["deno", "task", "start"]
