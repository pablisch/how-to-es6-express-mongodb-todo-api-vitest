import { Router } from 'express'
import todoController  from '../controllers/todoController.js'

const router = Router()

router.get('/', todoController.getAllTodos)
router.get('/:id', todoController.getTodoById)
router.post('/', todoController.createTodo)
router.delete('/:id', todoController.deleteTodo)
router.patch('/:id', todoController.updateTodo)

export default router
