import { allUsers, registerUser, findUserByEmail } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req, res) => {
    try {
        const result = await allUsers()
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
    }
}

// Register a new user
export const register = async (req, res) => {
    try {
        const { email, password, role, firstname, lastname } = req.body;
        
        if (!email || !password || !role || !firstname || !lastname) {
            return res.status(400).json({ message: "All fields required!" });
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        await registerUser(email, password, role, firstname, lastname);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Login user and generate JWT
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};