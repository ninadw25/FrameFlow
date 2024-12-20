const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const Listing = require("./scripts/listing");
const fs = require('fs');

const app = express();
const port = 5000;

// MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/frameflow', {
// mongoose.connect('mongodb://frameflow.p69vb.mongodb.net', {
mongoose.connect('mongodb+srv://priyanshsingh23cse:CTtWJ2JvFwDAL91M@frameflow.p69vb.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));

// view engine : ejs
// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));  //Put delete
app.use(express.static(path.join(__dirname, "public")));

// Serve assets folder for images or other static files
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/data", express.static(path.join(__dirname, "data")));

// Routes for CRUD Operations

app.get('/', (req, res) => {
    try {
        // Read the JSON file directly
        const jsonPath = path.join(__dirname, '/data/home.json');
        const frameflowData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        
        // Pass the data to the template
        res.render('home', { frameflowData });
    } catch (error) {
        console.error('Error loading JSON data:', error);
        res.status(500).send('Error loading page data');
    }
});

app.get("/explore", (req, res) => {
    res.render("explore", { currentPage: "explore" });
});

// app.get("/about", (req, res) => {
//     res.render("about", { currentPage: "about" });
// });

app.get("/about", (req, res) => {
    try {
        // Read the JSON file directly
        const jsonPath = path.join(__dirname, '/data/about-data.json');
        const aboutPageData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        
        // Pass the data to the template
        res.render('about', { aboutPageData });
    } catch (error) {
        console.error('Error loading About page JSON data:', error);
        res.status(500).send('Error loading about page data');
    }
});

app.get("/hire", async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.render("hire", { listings, currentPage: "hire" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching listings");
    }
});

app.get("/login", (req, res) => {
    res.render("login", { currentPage: "login" });
});

app.get("/signup", (req, res) => {
    res.render("signup", { currentPage: "signup" });
});

// Routes for CRUD Operations
app.get("/creators/new", (req, res) => {
    res.render("new-creator");
});
app.get("/portfolio", async (req, res) => {
    try {
        const portfolioId = req.query.id;
        const portfolio = await Listing.findById(portfolioId);
        
        res.render("portfolio", { 
            currentPage: "portfolio", 
            portfolio: portfolio 
        });
    } catch (error) {
        console.error("Portfolio Fetch Error:", error);
        res.status(500).send('Error retrieving portfolio data');
    }
});
app.post("/creators", async (req, res) => {
    try {
        const newListing = new Listing({
            image: req.body.image,
            badges: req.body.badges.split(',').map(badge => badge.trim()),
            title: req.body.title,
            author: req.body.author || req.body.title,
            description: req.body.description,
            price: req.body.standardPrice,
            standard: {
                price: req.body.standardPrice,
                description: req.body.standardDescription,
                features: req.body.standardFeatures.split(',').map(feature => feature.trim()),
                delivery: req.body.standardDelivery
            },
            strengths: req.body.strengths,
            rating: req.body.rating || '4.5',
            reviews: req.body.reviews || '50',
            duration: req.body.duration || '2-3 hours'
        });

        await newListing.save();
        res.redirect("/hire");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating listing: " + err.message);
    }
});

app.get("/creators/:id/edit", async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        res.render("edit-creator", { listing, currentPage: "hire" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error finding listing");
    }
});

app.put("/creators/:id", async (req, res) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, {
            image: req.body.image,
            badges: req.body.badges.split(',').map(badge => badge.trim()),
            title: req.body.title,
            author: req.body.author || req.body.title,
            description: req.body.description,
            price: req.body.standardPrice,
            standard: {
                price: req.body.standardPrice,
                description: req.body.standardDescription,
                features: req.body.standardFeatures.split(',').map(feature => feature.trim()),
                delivery: req.body.standardDelivery
            },
            strengths: req.body.strengths
        }, { new: true });

        res.redirect("/hire");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating listing");
    }
});

app.delete("/creators/:id", async (req, res) => {
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.redirect("/hire");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting listing");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});