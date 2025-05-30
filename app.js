import express from 'express';
import cors from 'cors';
import { authenticateToken } from "./middleware/authMiddleware.js";
import bookRoutes from './routes/bookRoutes.js';
import bookCopyRoutes from './routes/bookCopyRoutes.js';
import patronRoutes from './routes/patronRoutes.js';
import checkOutReturnRoutes from './routes/checkOutReturnRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import holdRoutes from './routes/holdRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;


// Enable CORS for specific domains
const corsOptions = {
    origin: ["http://localhost:5173", "https://library-app-frontend-mu.vercel.app"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
console.log(authenticateToken);

app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protect all other routes
app.use(authenticateToken);

app.use('/api/books', bookRoutes);
app.use('/api/bookcopies', bookCopyRoutes);
app.use('/api/patrons', patronRoutes);
app.use('/api/checkout', checkOutReturnRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/hold', holdRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

