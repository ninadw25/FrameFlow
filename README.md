# FrameFlow: Photographer Showcase Platform

## Description
FrameFlow is a dynamic platform designed to showcase photographers’ portfolios, connecting them with potential clients. Built with modern technologies like **EJS**, **Handlebars**, and **MongoDB**, FrameFlow offers seamless user experience, robust data handling, and customizable features. Photographers can manage their portfolios and engage with clients directly, while clients can easily book and review services.

## Features
- **Photographer Portfolio Showcase:** A gallery to display images, allowing photographers to share their creative work.
- **User Authentication & Authorization:** Secure login and sign-up system for both photographers and clients.
- **CRUD Operations with MongoDB:** Allows users to add, edit, and delete portfolios and client bookings.
- **Dynamic Content Rendering with EJS & Handlebars:** Efficient rendering of common website elements like headers, footers, and other reusable components.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Contact & Social Integration:** Direct clients to photographers' social media profiles and contact forms.
- **Client Reviews & Ratings:** Clients can leave reviews for photographers after booking.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, JavaScript, EJS, Handlebars
- **Database:** MongoDB
- **Authentication:** Passport.js for secure user login/signup
- **File Management:** Multer for handling image uploads

## Usage
- User Registration: Photographers and clients can sign up or log in.
- Portfolio Management: Photographers can upload, edit, and delete portfolio items.
- Client Interaction: Clients can browse portfolios, book photographers, and leave reviews.
- Admin Features: Admins can oversee user activity and manage portfolios.

## API Routes

| Endpoint               | Method | Description                      |
|------------------------|--------|----------------------------------|
| `/signup`              | POST   | Create a new user               |
| `/login`               | POST   | Authenticate a user             |
| `/portfolio`           | GET    | Fetch portfolios                |
| `/portfolio/add`       | POST   | Add a new portfolio item        |
| `/portfolio/edit/:id`  | PUT    | Edit an existing portfolio item |
| `/portfolio/delete/:id`| DELETE | Delete a portfolio item         |
