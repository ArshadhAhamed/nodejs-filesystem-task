const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const filesDir = path.join(__dirname, 'files');

// Ensure the files directory exists
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
}

// Root route to handle GET requests to "/"
app.get('/', (req, res) => {
    res.send('Welcome to the NodeJS File System API!');
});

// Endpoint to create a text file with current timestamp
app.post('/create-file', (req, res) => {
    const timestamp = new Date().toISOString();
    const fileName = `${timestamp.replace(/:/g, '-')}.txt`;
    const filePath = path.join(filesDir, fileName);

    fs.writeFile(filePath, timestamp, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create file' });
        }
        res.status(200).json({ message: 'File created', fileName });
    });
});

// Endpoint to retrieve all text files in the directory
app.get('/files', (req, res) => {
    fs.readdir(filesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read directory' });
        }
        res.status(200).json({ files });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
