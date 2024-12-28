import Sample from '../models/sample.js'
import sampleSeedData from './samplesSeedData.js'
import connectToDatabase from '../db.js'

const clearSamples = async () => {
  await Sample.deleteMany({})
}

const insertSamples = async () => {
  await Sample.insertMany(sampleSeedData)
}

const seedSamples = async (logSuccess = true) => {
  try {
    await connectToDatabase(logSuccess)
    await clearSamples()
    await insertSamples()
    if (logSuccess) console.log('Sample seeding completed successfully.')
  } catch (error) {
    console.error('Sample seeding failed:', error)
  } finally {
    if (logSuccess) process.exit(0)
  }
}

export default seedSamples

// for TEST db => npm run seed:samples:test
// for dev/production db => npm run seed:samples:dev
// when used for testing seeding, pass in logSuccess as false
