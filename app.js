import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes.js'
import bookCopyRoutes from './routes/bookCopyRoutes.js'
import patronRoutes from './routes/patronRoutes.js'
import checkOutReturnRoutes from './routes/checkOutReturnRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import holdRoutes from './routes/holdRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express();
const port = 3000;

// Enable CORS for specific domains
const corsOptions = {
    origin: ["http://localhost:5173", "https://yourfrontend.com"], // Adjust this based on frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Library Management System!');
});

app.use('/api/books', bookRoutes)
app.use('/api/bookcopies', bookCopyRoutes)
app.use('/api/patrons', patronRoutes)
app.use('/api/checkout', checkOutReturnRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/hold', holdRoutes)
app.use('/api/auth', authRoutes)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
