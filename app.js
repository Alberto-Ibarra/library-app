import express from 'express';
import bookRoutes from './routes/bookRoutes.js'

const app = express();
const port = 3000;

// Middleware (for parsing JSON and logging requests)
app.use(express.json());

// Routes
app.get('/bookvault', (req, res) => {
    res.send('Welcome to the Library Management System!');
});

app.use('/bookvault', bookRoutes)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
