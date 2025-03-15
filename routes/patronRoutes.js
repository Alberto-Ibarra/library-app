import express from 'express'
import { addNewPatron, activatePatron, suspendPatron, allActivePatrons, updateP } from '../controllers/patronController.js';

const router = express.Router()

router.post('/addpatron', addNewPatron)
router.put('/activatepatron/:id', activatePatron)
router.put('/suspendpatron/:id', suspendPatron)
router.get('/patrons', allActivePatrons)
router.put('/updatePatron/:id', updateP)

export default router