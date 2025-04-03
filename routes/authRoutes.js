import express from 'express'
import { getAllUsers, register, login, updateUserById } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', getAllUsers);
router.put('/updateuser/:id', updateUserById);
router.post("/register", register);
router.post("/login", login);

// Example of a protected route
router.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "You have access to this protected route!" });
});

export default router
