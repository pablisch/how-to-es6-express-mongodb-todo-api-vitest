# Set up the API repository

## Create files and folders

Create a local directory for the project and navigate to it in the terminal.
Initialise npm and git, install dependencies and dev dependencies, and create the required folders and files.

```bash
npm init -y
git init
npm i express mongoose dotenv cors
npm i -D jest supertest
mkdir controllers routes models spec seed utils
touch .env .gitignore server.js app.js db.js app.test.js db.js seed/todosSeedData.js seed/seedTodos.js seed/callSeedTodos.js routes/todoRoutes.js controllers/todoController.js controllers/todoController.test.js models/todo.js spec/todos.yml jest.config.js
```

## Git ignore

Add required file exemptions to the `.gitignore` file so that git does not track these items, e.g.

```
node_modules
.DS_Store
.env
```

## environment variables

In the `.env` file, add the following:

```bash
MONGODB_USERNAME=<your-username>
MONGODB_PASSWORD=<your-password>
MONGODB_DATABASE_NAME=<your-database-name>
MONGODB_CLUSTER_REF=<your-cluster-reference> # e.g. cluster0.kdyng
PORT=3000
```

## Jest config

As a result of using ES6 modules, it was necessary to create a Jest config file, `jest.config.js`, that was not deeded in previous API set-ups. in `jest.config.js`:

```javascript
export default {
  transform: {},
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
    "**/?(*.)+(spec|test).mjs"
  ],
  testPathIgnorePatterns: ["/node_modules/"],
}
```

This tells Jest not to transform code as it does for JSX, TypeScript, etc. This is not ideal as although it works in this instance, it would prove a real headache to use, e.g. with React.
The `testMatch` part sets Jest to look for the `.mjs` we have to use to get it to work with ES6 modules.

[NEXT: Setting up a basic Express server](1c_setUp_expressServer.md)
