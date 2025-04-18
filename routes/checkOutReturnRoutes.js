import express from 'express'
import { checkout, returnB, getPatronInfo, getBooksCheckedOutByPatron } from "../controllers/checkOutReturnController.js";

const router = express.Router()

router.post('/checkout/:bookcopyid/:patronid', checkout);
router.put('/return/:id', returnB);
router.get('/patroninfo/:id', getPatronInfo);
router.get('/patron/:id', getBooksCheckedOutByPatron);

export default router