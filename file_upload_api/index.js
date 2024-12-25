require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const pdfRoutes = require('./routes/fileRoutes');
//const connectDB = require('./db/connect');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', pdfRoutes);

// Serve static files from the "output" directory
app.use('/output', express.static(path.join(__dirname, 'output')));

async function start() {
    try {
        //await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
}

start();

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
