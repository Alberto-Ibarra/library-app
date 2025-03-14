import express from 'express'
import { addNewPatron } from '../controllers/patronController.js';

const router = express.Router()
console.log("routes triggered");

router.post('/addpatron', addNewPatron)

export default router