# Choices for form of controller functions

There are many ways that you could choose to write, export and import the controller functions for this project. For anyone unfamiliar with some of these forms this is a very brief guide to help you navigate and choose between them. For a simple CRUD API this will largely be a style choice.

- [Named export with arrow function](#named-export-with-arrow-function)
- [Named export with traditional/classic functions](#named-export-with-traditionalclassic-function)
- [Object of arrow functions](#object-of-arrow-functions)
- [Object of traditional/classic functions](#object-of-traditionalclassic-function)
- [Class based functions](#class-based-controller-functions)
- [Notes on variations](#notes-on-variations)
  - [Choices of exporting functions](#named-export-export-variation)
  - [Destructuring exported objects of functions](#destructuring-an-exported-object-of-functions)

My choice for this project was to have an [object of arrow functions](#object-of-arrow-functions). I prefer this as exporting the entire object means that as the functions within the controller change, there is no need to adjust the export or import of the controller in any way. For me, this simplicity is benefit enough.

## Named export with arrow function

Example declaration:
```javascript
export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find()
    res.status(200).json(todos)
  } catch (error) {
    next(error)
  }
}
```

This is very lightweight and single functions can be easily imported and used.

Example import:
```javascript
import { getAllTodos, otherControllerFunction } from '../controllers/todoController.js'
```

Example use:
```javascript
router.get('/todos', getAllTodos)
```
```javascript
await getAllTodos()
```

## Named export with traditional/classic function

Example declaration:
```javascript
export const getAllTodos = async function (req, res, next) {
  try {
    const todos = await Todo.find()
    res.status(200).json(todos)
  } catch (error) {
    next(error)
  }
}
```

This traditional variation of the [named export function](#named-export-with-arrow-function) includes `this` binding but that is not really a concern here so the choice between them is largely a style preference.

The import and usage is the same as those for the named export with arrow functions.

## Object of arrow functions

Example declaration:
```javascript
export default {
  getAllTodos: async (req, res, next) => {
    try {
      const todos = await Todo.find()
      res.status(200).json(todos)
    } catch (error) {
      next(error)
    }
  },
}
```

Other functions will then also go inside the `export default` block. 

This form does not have the function context, `this`. This is not a concern here but if, for example, I wanted to call functions from both inside and outside this object then it would be easier to use an [object of traditional/classic functions](#object-of-traditionalclassic-function).

Example import:
```javascript
import todoController from '../controllers/todoController.js'
```

Example use:
```javascript
router.get('/todos', todoController.getAllTodos)
```
```javascript
await todoController.getAllTodos()
```

The need to declare the controller object when calling the function, e.g. `todoController.getAllTodos()`, adds clarity for me but some people would not like this verbosity.

## Object of traditional/classic function

Example declaration:
```javascript
export default {
  getAllTodos: async function (req, res, next) {
    try {
      const todos = await Todo.find()
      res.status(200).json(todos)
    } catch (error) {
      next(error)
    }
  },
}
```

This traditional variation of the named export function includes `this` binding but that is not really a concern here so the choice between them is largely a style preference. As mentioned in the [object of arrow functions](#object-of-arrow-functions) sections, there are situations when this syntax would be beneficial.

The import and usage is the same as those for the [object of arrow functions](#object-of-arrow-functions).

## Class-based controller functions

A possible design choice, especially for more complex applications.

```javascript
class TodoController {
  static async getAllTodos(req, res, next) {
    try {
      const todos = await Todo.find()
      res.status(200).json(todos)
    } catch (error) {
      next(error)
    }
  }
}

export default new TodoController()
```

This is an option that I have never used and have particular plans to, so nothing personally to say about it.

Example import:
```javascript
import TodoController from '../controllers/todoController.js'
```

Example use:
```javascript
router.get('/todos', TodoController.getAllTodos.bind(TodoController));
```
```javascript
await todoController.getAllTodos.bind(TodoController)
```

## Notes on variations

The above is a very limited list of possible options with relatively little explanation of the variations. In terms of variation, I would like to highlight a couple of what I see as the key points:

- different ways to export and import named functions
- destructuring an exported object


### Named export export variation

Instead of directly exporting a named function:
```javascript
export const getAllTodos = async (req, res, next) => {
  console.log("Doing something")
}
```
and importing it:
```javascript
import { getAllTodos } from '../controllers/todoController.js'
```

There is the option of exporting them in an export object:
```javascript
const getAllTodos = async (req, res, next) => {
  console.log("Doing something")
}

export default {
  getAllTodos,
  otherFunctions,
}
```
and then import the object:
```javascript
import todoController from '../controllers/todoController.js'
```
and use the functions:
```javascript
await todoController.getAllTodos()
```

### Destructuring an exported object of functions

Given my preferred method, using an [object of arrow functions](#object-of-arrow-functions), whilst it is not possible to directly destructure the object, it is possible to import and then destructure if that is desired.

So you cannot do this:
```javascript
import { getAllTodos } from './todo.controller.js'
```

but you can do this:
```javascript
import todoController from './todo.controller.js'

const { getAllTodos } = todoController

router.get('/todos', getAllTodos)
```

Not sure why you would want to do this but everyone seems to have a different favourite way of writing and reading code.