# 🌍 Wanderlust – Airbnb Clone

**Wanderlust** is a full-stack travel web application inspired by Airbnb, built to explore unique stays and travel destinations. It allows users to view, filter, and manage property listings with beautiful UI and interactive maps.

## 🔗 Live Demo
[🌐 View Wanderlust](https://wanderlust-wtet.onrender.com/listings)

## 📁 GitHub Repository
[📂 GitHub Source Code](https://github.com/codewithaakash22/wanderlust)

---

## 🚀 Features

- 🔐 User Authentication (Sign Up, Log In, Log Out)
- 🧭 Map integration using **Mapbox**
- 🖼️ Image upload via **Cloudinary**
- 📂 Filter listings by location, category, and price
- 🏡 Add and manage your own property listings
- 📱 Fully responsive design using **Bootsrap**
- ✏️ Edit or delete listings (only for authorized users)

---

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- **EJS Templating Engine**
- Bootstrap

### Backend
- **Node.js**, **Express.js**
- **MongoDB** with **Mongoose**
- **Cloudinary** for image hosting
- **Mapbox** for geolocation & interactive maps

### Authentication
- **Passport.js** for user auth
- Session-based login

---

## 📸 Screenshots

>![image](https://github.com/user-attachments/assets/62288381-bebc-4f9c-b738-72fd18d86af5)


---

## 📦 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/codewithaakash22/wanderlust.git

# 2. Install dependencies
cd wanderlust
npm install

# 3. Create a .env file and add the following:
# Replace with your own credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
MAPBOX_TOKEN=your_mapbox_token
DB_URL=your_mongodb_connection_url
SECRET=your_session_secret

# 4. Run the app
npm start
