import express from 'express';
import { getAllBookCopies,
    addNewBookCopy,
    deleteBookCopy,
    getAllAvailableCopies,
    getCheckedOutCopies,
    copiesOnHold,
    updateBookCopy,
    getSingleBookDetails
} from '../controllers/bookCopyController.js';

const router = express.Router();

router.get('/copies', getAllBookCopies);
router.post('/copies', addNewBookCopy);
router.put('/copies/:id', updateBookCopy);
router.delete('/copies/:id', deleteBookCopy);
router.get('/available', getAllAvailableCopies);
router.get('/checkedout', getCheckedOutCopies);
router.get('/onhold', copiesOnHold);
router.get('/copy/:id', getSingleBookDetails);


export default router;
