# Set up the API repository

## Create files and folders

Create a local directory for the project and navigate to it in the terminal.
Initialise npm and git, install dependencies and dev dependencies, and create the required folders and files.

```bash
npm init -y
git init
npm i express mongoose dotenv cors
npm i -D vitest supertest
mkdir controllers routes models spec seed utils
touch .env .gitignore server.js app.js db.js app.test.js db.js seed/todosSeedData.js seed/seedTodos.js seed/callSeedTodos.js routes/todoRoutes.js controllers/todoController.js controllers/todoController.test.js models/todo.js spec/todos.yml
```

## Git ignore

Add required file exemptions to the `.gitignore` file so that git does not track these items, e.g.

```
node_modules
.DS_Store
.env
```

## Environment variables

In the `.env` file, add the following:

```bash
MONGODB_USERNAME=<your-username>
MONGODB_PASSWORD=<your-password>
MONGODB_DATABASE_NAME=<your-database-name>
MONGODB_CLUSTER_REF=<your-cluster-reference> # e.g. cluster0.kdyng
PORT=3000
```

[NEXT: Setting up a basic Express server](1c_setUp_expressServer.md)
