import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    completed: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Todo', todoSchema)
