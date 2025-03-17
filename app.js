import express from 'express';
import bookRoutes from './routes/bookRoutes.js'
import bookCopyRoutes from './routes/bookCopyRoutes.js'
import patronRoutes from './routes/patronRoutes.js'
import checkOutReturnRoutes from './routes/checkOutReturnRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import holdRoutes from './routes/holdRoutes.js'

const app = express();
const port = 3000;

// Middleware (for parsing JSON and logging requests)
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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
