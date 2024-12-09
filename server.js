import app from './app.js'
import connectToDatabase from './db.js'

const port = process.env.PORT || 3000

;(async () => {
  try {
    await connectToDatabase()
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  } catch (error) {
    console.error('Failed to start the server:', error)
    process.exit(1)
  }
})()
