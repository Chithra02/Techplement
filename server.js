const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to SQLite database
const db = new sqlite3.Database('./quotes.db');

// Serve static files
app.use(express.static('.'));

// API endpoint to get random quote or quote by author
app.get('/quote', (req, res) => {
    const author = req.query.author;
    const sql = author ? 
        `SELECT * FROM quotes WHERE author LIKE ? ORDER BY RANDOM() LIMIT 1` : 
        `SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1`;
    const params = author ? [`%${author}%`] : [];

    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row || { content: 'No quote found', author: 'Unknown' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get('/quote', (req, res) => {
    const author = req.query.author;
    const sql = author ? 
        `SELECT * FROM quotes WHERE author LIKE ? ORDER BY RANDOM() LIMIT 1` : 
        `SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1`;
    const params = author ? [`%${author}%`] : [];

    console.log(`SQL Query: ${sql}`, params); // Debugging log

    db.get(sql, params, (err, row) => {
        if (err) {
            console.error(err.message); // Debugging log
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Quote found:', row); // Debugging log
        res.json(row || { content: 'No quote found', author: 'Unknown' });
    });
});
