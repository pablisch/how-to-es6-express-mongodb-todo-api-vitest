# Adding the GET /todos endpoint as controller function and route

## Adding the getAllTodos controller function

In the controller file, `todoController.js`, in the `controllers` folder, start by adding imports for `mongoose` and the `Todo` schema model:

```javascript
import Todo from '../models/todo.js'
import mongoose from 'mongoose'
```

There are choices to be made about how to import and export functions. The most common pattern I have seen for an Express API is to export each function individually, e.g. `export const getAllTodos = ...` and then they are imported destructured from the controller file, e.g. `import { getAllTodos, ... } from ...`. Personally I prefer to export the whole controller and call functions from the controller which I find both easier and more verbose in a helpful way. For the sake fo this guide, I suggest following this pattern and then refactoring afterwards if you prefer. There is also an information section on [function form choices](7e_misc_controllerFunctionFormChoices.md).

Create a `default export` block:

```javascript
export default {
  
}
```

All todo controller functions will go inside this block and will not need any further exporting.

Add the simple controller function

```javascript
getAllTodos: async (req, res, next) => {
  try {
    const todos = await Todo.find()
    res.status(200).json(todos)
  } catch (error) {
    next(error)
  }
},
```

**NOTE:** When viewing this code snippet inside an IDE, you may get warnings, e.g. `function name expected`, but this should go away once in the context of the `export default` block.

## Create the todo route

In the routes/todoRoutes.js file, import the express router and the todo controller, create the router, and export it:

```javascript
import { Router } from 'express'
import todoController  from '../controllers/todoController.js'

const router = Router()

export default router
```

Between the imports and export, add the first route:

```javascript
router.get('/', todoController.getAllTodos)
```

**NOTE:** The route is just `/` as the `/api/v1.0/todos` endpoint root is handled in the app.js file.

## Import and use the todo route into app.js

In the app.js file, import the todo route as `todoRoutes` with the other imports:

```javascript
import todoRoutes from './routes/todoRoutes'
```

Use`todoRoutes` between the single home route and the `next` error handling middleware:

```javascript
app.use('/api/v1.0/todos', todoRoutes)
```

The `app.js` file should now look ike this:

```javascript
import express from 'express'
import todoRoutes from './routes/todoRoutes'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/v1.0/todos', todoRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ message: err.message })
})

export default app
```

[NEXT: getAllTodos controller function unit tests](2c_getTodos_UnitTests.md)

## Final code at the end of this section

### app.js

```javascript
import express from 'express'
import todoRoutes from './routes/todoRoutes'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/v1.0/todos', todoRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ message: err.message })
})

export default app
```

### routes/todoRoutes.js

```javascript
import { Router } from 'express'
import todoController  from '../controllers/todoController.js'

const router = Router()

router.get('/', todoController.getAllTodos)

export default router
```

### controllers/todoController.js

```javascript
import Todo from '../models/todo.js'
import mongoose from 'mongoose'

export default {
  getAllTodos: async function(req, res, next) {
    try {
      const todos = await Todo.find()
      res.status(200).json(todos)
    } catch (error) {
      next(error)
    }
  },
}
```

[NEXT: getAllTodos controller function unit tests](2c_getTodos_UnitTests.md)
