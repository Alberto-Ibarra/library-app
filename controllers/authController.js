import { allUsers, registerUser, findUserByEmail, updateUser, deleteUserById } from "../models/userModel.js";
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

export const updateUserById = async (req, res) => {
    try {
        const { role, firstname, lastname, email } = req.body;
        const { id } = req.params;

        if (!role?.trim() || !firstname?.trim() || !lastname?.trim() || !email?.trim()) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const updatedUser = await updateUser(id, role, firstname, lastname, email);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await deleteUserById(id);
        res.status(200).json(deleteUser);
    } catch (error) {
        console.error(error);
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

        console.log("User info:", user);

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
        res.json({
            token,
            user: {
                id: user.id,
                firstname: user.firstname,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};