import express from 'express'
import { getAllUsers, register, login, updateUserById, deleteUser } from "../controllers/authController.js";
import { authenticateToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', verifyAdmin, getAllUsers);
router.put('/updateuser/:id', verifyAdmin, updateUserById);
router.delete('/delete/:id', verifyAdmin, deleteUser);
router.post("/register", verifyAdmin, register);
router.post("/login", login);

// Example of a protected route
router.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "You have access to this protected route!" });
});

export default router
