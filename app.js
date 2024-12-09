import express from 'express'
import cors from 'cors'
import todoRoutes from './routes/todoRoutes.js'

const app = express()

// const corsOrigin = process.env.CORS_ORIGIN || 'https://gallery-58b4.onrender.com';
// console.log('🪧  >>> CORS:', corsOrigin);

// const corsOptions = {
//   origin: corsOrigin,
// }

// app.use(cors(corsOptions));
app.use(cors())

app.use(express.json())

app.use('/api/v1.0/todos', todoRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ message: err.message })
})

export default app
