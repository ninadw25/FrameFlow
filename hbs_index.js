const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = 8000;

// Set up Handlebars as the template engine
app.engine('hbs', exphbs.engine({
    extname: '.hbs', // Set file extension to .hbs
    defaultLayout: false, // No default layout
    partialsDir: path.join(__dirname, 'views/partials'), // Path to partials
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('about');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
