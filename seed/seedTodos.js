import Todo from '../models/todo.js'
import todoSeedData from './todosSeedData.js'
import connectToDatabase from '../db.js'

const clearTodos = async () => {
  await Todo.deleteMany({})
}

const insertTodos = async () => {
  await Todo.insertMany(todoSeedData)
}

const seedTodos = async (logSuccess = true) => {
  try {
    await connectToDatabase(logSuccess)
    await clearTodos()
    await insertTodos()
    if (logSuccess) console.log('Todo seeding completed successfully.')
  } catch (error) {
    console.error('Todo seeding failed:', error)
  } finally {
    if (logSuccess) process.exit(0)
  }
}

export default seedTodos

// for TEST db => npm run seed:todos:test
// for dev/production db => npm run seed:todos:dev
// when used for testing seeding, pass in logSuccess as false
