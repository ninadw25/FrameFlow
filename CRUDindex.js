const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const Listing = require("./scripts/old_listing");

const app = express();
const port = 5000;

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/frameflowDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.log("MongoDB Connection Error:", err));

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));

// Serve assets folder for images or other static files
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/data", express.static(path.join(__dirname, "data")));

// Routes for CRUD Operations
app.get("/", (req, res) => res.render("home", { currentPage: "home" }));
app.get("/explore", (req, res) => res.render("explore", { currentPage: "explore" }));
app.get("/about", (req, res) => res.render("about", { currentPage: "about" }));
app.get("/hire", async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.render("hire", { listings, currentPage: "hire" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching listings");
    }
});
app.get("/login", (req, res) => res.render("login", { currentPage: "login" }));
app.get("/signup", (req, res) => res.render("signup", { currentPage: "signup" }));

// Routes for CRUD Operations
app.get("/creators/new", (req, res) => {
    res.render("new-creator");
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











// const express = require("express");
// const app = express();
// const path = require("path");

// const port = 5000;
// app.listen(port, () => {
//     console.log(`listening on port ${port}`);
// });

// app.set("view engine", "ejs"); // ejs helps in rendering the templates
// app.set("views", path.join(__dirname, "views"));   //hardcoding the path for views folder 
// // app.set("views", path.resolve('./views'));

// // Serve assets folder for images or other static files
// app.use("/assets", express.static(path.join(__dirname, "assets")));
// app.use("/data", express.static(path.join(__dirname, "data")));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static('./scripts'));

// // app.use(express.static(path.resolve('./public')));

// // ALL THE EJS FILES RENDERING DONE HERE
// app.get("/", (req,res) => {
//     res.render("home.ejs");     // Yaha par views jo search karega for home.ejs
// });
// app.get("/explore", (req,res) => {
//     res.render("explore.ejs");     
// });
// app.get("/about", (req,res) => {
//     res.render("about.ejs");     
// });
// app.get("/hire", (req,res) => {
//     res.render("hire.ejs");     
// });
// app.get("/login", (req,res) => {
//     res.render("login.ejs");     
// });
// app.get("/signup", (req,res) => {
//     res.render("signup.ejs");     
// });


// // Header file routing
// app.get("/", (req, res) => res.render("home", { currentPage: "home" }));
// app.get("/explore", (req, res) => res.render("explore", { currentPage: "explore" }));
// app.get("/about", (req, res) => res.render("about", { currentPage: "about" }));
// app.get("/hire", (req, res) => res.render("hire", { currentPage: "hire" }));

