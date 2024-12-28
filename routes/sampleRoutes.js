import { Router } from 'express'
import sampleController from '../controllers/sampleController.js'

const router = Router()

router.get('/', sampleController.getAllSamples)
router.get('/:id', sampleController.getSampleById)
router.post('/', sampleController.createSample)
router.delete('/:id', sampleController.deleteSample)
router.patch('/:id', sampleController.updateSample)

export default router
