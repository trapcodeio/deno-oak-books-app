# dev stage
FROM denoland/deno:alpine

WORKDIR /usr/src/app

# Needed for VS Code Remote Development
RUN apk add musl libgcc libstdc++ git curl wget bash ca-certificates openssh-client

COPY . .

USER deno
RUN deno cache server.ts

expose 9000

CMD ["deno", "task", "start"]


