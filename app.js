import express from 'express'
import cors from 'cors'
import todoRoutes from './routes/todoRoutes.js'
import sampleRoutes from './routes/sampleRoutes.js'

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
app.use('/api/v1.0/samples', sampleRoutes)

app.use((req, res, next) => {
  return next({status: 404, message: `Unable to respond to request to ${req.originalUrl}. The lights are on but nobody is home.`})
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: true, message: err.message || "An unknown error occurred.", ...err })
})

export default app
