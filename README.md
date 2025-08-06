# ECHO - a microblogging app 

🚧 **This project is currently in development. Features and structure may change.** 🚧

A full-stack Twitter clone built using the **MERN stack** (MongoDB, Express, React, Node.js), featuring authentication, tweeting, and user management functionalities.

---

## 🚀 Features

- 🔐 User Authentication (JWT-based)
- 📝 Post Tweets
- 🧵 View All Tweets (Global Feed)
- 👤 User Profile Pages
- ❤️ Like Tweets (optional)
- 🔍 Responsive UI with React
- 💾 MongoDB for data persistence
- 🛠️ RESTful API with Express.js

---

## 🧰 Tech Stack

### Frontend:

- React.js (with Hooks)
- React Router
- Axios
- Tailwind CSS / CSS Modules (if used)

### Backend:

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcrypt.js (for password hashing)

---

## 📁 Project Structure

my-twitter-clone/
│
├── backend/ # Express API
│ ├── models/ # Mongoose Schemas
│ ├── routes/ # Express Routes
│ ├── controllers/ # Request Handlers
│ ├── config/ # DB & auth config
│ └── index.js # App Entry Point
│
├── frontend/ # React App
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.js
│ └── public/
│
├── .gitignore
├── package.json ( root-level dependencies)
└── README.md
