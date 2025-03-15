import express from 'express'
import { checkout } from "../controllers/checkOutReturnController.js";

const router = express.Router()

router.post('/checkout/:bookCopyId/:patronId', checkout)

export default router