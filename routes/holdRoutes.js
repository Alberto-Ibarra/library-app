import express from 'express'
import { placeHold, cancelBookHold } from '../controllers/holdController.js'

const router = express.Router()

router.post('/placehold/:bookCopyId/:patronId', placeHold)
router.delete('/cancelhold/:holdId/:patronId', cancelBookHold)

export default router