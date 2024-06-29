# Setup Project

Create .env file

```
DATABASE_URL="mysql://tes:tes@localhost:3306/ts_restful_api"
```
#### Install npm
```shell

npm install

```

#### Migrate prisma model and generate
```shell

npx prisma migrate dev

npx prisma generate

```

#### Compile .ts file
```shell

npm run build

```

#### Run main.js file
```shell

npm run start

```

