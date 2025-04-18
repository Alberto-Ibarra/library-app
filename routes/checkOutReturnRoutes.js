import express from 'express'
import { checkout, returnB } from "../controllers/checkOutReturnController.js";

const router = express.Router()

router.post('/checkout/:bookcopyid/:patronid', checkout);
router.put('/return/:bookcopyid/:patronid', returnB);

export default router