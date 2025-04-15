import express from 'express'
import { checkout, returnB } from "../controllers/checkOutReturnController.js";

const router = express.Router()

router.post('/checkout/:bookCopyId/:patronId', checkout);
router.put('/return/:bookCopyId/:patronId', returnB);

export default router