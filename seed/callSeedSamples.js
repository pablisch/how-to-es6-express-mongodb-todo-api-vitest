import seedSamples from './seedSamples.js'
;(async () => {
  try {
    await seedSamples()
    console.log('Seeding completed successfully 🌱')
  } catch (error) {
    console.error('Seeding failed:', error)
  }
})()
