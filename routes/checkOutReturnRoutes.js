import express from 'express'
import { checkout, returnB, getPatronInfo } from "../controllers/checkOutReturnController.js";

const router = express.Router()

router.post('/checkout/:bookcopyid/:patronid', checkout);
router.put('/return/:id', returnB);
router.get('/patroninfo/:id', getPatronInfo);

export default router