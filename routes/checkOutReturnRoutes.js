import express from 'express'
import { checkout, returnB } from "../controllers/checkOutReturnController.js";

const router = express.Router()

router.post('/checkout/:bookcopyid/:patronid', checkout);
router.put('/checkout/return/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        // logic to mark book copy as returned
        res.json({ message: 'Book returned successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error returning book' });
    }
});


export default router