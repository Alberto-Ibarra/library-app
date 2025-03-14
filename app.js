import express from 'express';
import bookRoutes from './routes/bookRoutes.js'
import bookCopyRoutes from './routes/bookCopyRoutes.js'
import patronRoutes from './routes/patronRoutes.js'

const app = express();
const port = 3000;

// Middleware (for parsing JSON and logging requests)
app.use(express.json());

// Routes
app.get('/bookvault', (req, res) => {
    res.send('Welcome to the Library Management System!');
});

app.use('/', bookRoutes)
app.use('/', bookCopyRoutes)
app.use('/', patronRoutes)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
