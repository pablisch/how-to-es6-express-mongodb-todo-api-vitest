import Sample from '../models/sample.js'
import mongoose from 'mongoose'

export default {
  getAllSamples: async (req, res, next) => {
    try {
      let samples = await Sample.find()
      res.status(200).json(samples)
    } catch (error) {
      next(error)
    }
  },

  getSampleById: async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
      return next({ status: 400, message: `'${id}' is not a valid sample ID` })
    try {
      let sample = await Sample.findById(id)
      if (!sample) {
        return next({
          status: 404,
          message: `No sample with ID ${id} was found in the database`,
        })
      }
      const { _id, ...rest } = sample
      res.status(200).json(sample)
    } catch (error) {
      next(error)
    }
  },

  createSample: async (req, res, next) => {
    const { task } = req.body
    if (task === '')
      return next({
        status: 400,
        message: 'The task property cannot be an empty string',
      })
    if (!task) return next({ status: 400, message: `No task was provided` })
    if (typeof task !== 'string')
      return next({
        status: 400,
        message: `Task must be a string but type ${typeof task} was given`,
      })
    const sample = new Sample({
      task,
      completed: false,
    })
    try {
      await sample.save()
      res.status(201).json(sample)
    } catch (error) {
      next(error)
    }
  },

  deleteSample: async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next({ status: 400, message: `'${id}' is not a valid sample ID` })
    }
    try {
      const sample = await Sample.findByIdAndDelete(id)
      if (!sample) {
        return next({
          status: 404,
          message: `No sample with ID ${id} was found in the database`,
        })
      }
      res
        .status(200)
        .json({ message: `Sample with ID ${id} was successfully deleted` })
    } catch (error) {
      next(error)
    }
  },

  updateSample: async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next({ status: 400, message: `'${id}' is not a valid sample ID` })
    }
    const updates = req.body
    if (!updates || typeof updates !== 'object' || Array.isArray(updates)) {
      return next({
        status: 400,
        message: 'The request body must be a valid JS object',
      })
    }
    const { task, completed } = req.body
    if (task === '')
      return next({
        status: 400,
        message:
          'Task cannot be an empty string. If a task property is sent, it must be a valid string',
      })
    if (!task && !completed && completed !== false) {
      return next({
        status: 400,
        message: 'Updating a sample requires a task and/or completed property',
      })
    }
    if (task && typeof task !== 'string')
      return next({
        status: 400,
        message: `Task property must be a string. Received type ${typeof task}`,
      })
    if (completed && typeof completed !== 'boolean')
      return next({
        status: 400,
        message: `Completed property must be a Boolean. Received type ${typeof completed}`,
      })
    try {
      const sample = await Sample.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      })
      if (!sample) {
        return next({
          status: 404,
          message: `No sample with ID ${id} was found in the database`,
        })
      }
      res.status(200).json(sample)
    } catch (error) {
      next(error)
    }
  },
}
