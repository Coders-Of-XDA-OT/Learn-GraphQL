# Launch Prisma GraphQL Client with Docker

- Install Docker Hub
- Start Docker

> We are using postgres with heroku

```js
npm i -g prisma
prisma init projectName
```

- setup prisma project

```js
cd ./projectName
docker-composer up -d
prisma deploy
```
