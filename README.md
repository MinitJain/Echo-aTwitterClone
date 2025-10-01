# Echo 

Echo is a full-stack microblogging platform similar to Twitter and Threads. Built with the MERN stack (MongoDB, Express, React, Node.js), it features real-time tweet posting, user authentication, profiles, and social interactions.

## Features
- User registration, login, and JWT authentication
- Secure password hashing (bcrypt)
- Create, delete, like/dislike tweets
- Follow/unfollow users
- Bookmark tweets
- Edit user profile
- Responsive UI with Tailwind CSS
- Rate-limited authentication endpoints
- Secure cookies and CORS for cross-origin requests
- Health check endpoint for backend

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Frontend:** React, Redux, Axios, Tailwind CSS
- **Deployment:** Render (backend), Vercel (frontend)

## Getting Started

### Prerequisites
- Node.js >= 18
- npm
- MongoDB Atlas account (or local MongoDB)

### Environment Variables

#### Backend (`backend/.env`)
```
MONGO_URI=your_mongo_uri
PORT=8080
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

#### Frontend (`frontend/twitterclone/.env`)
```
REACT_APP_API_URL=https://your-backend-domain.onrender.com
```
## 🔗 Live Demo
[**View Live App**] https://echo-frontend-rose.vercel.app/login


### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/MinitJain/Echo-aTwitterClone.git
   cd Echo-aTwitterClone
   ```

2. **Install dependencies:**
   ```sh
   npm install --prefix backend
   npm install --prefix frontend/twitterclone
   ```

3. **Build the frontend:**
   ```sh
   npm run build --prefix frontend/twitterclone
   ```

4. **Start the backend:**
   ```sh
   npm start --prefix backend
   ```

5. **Test health endpoint:**
   ```sh
   curl http://localhost:8080/api/health
   # Response: {"status":"ok"}
   ```

### Deployment
- **Backend:** Push to GitHub and connect to Render. Set environment variables in Render dashboard.
- **Frontend:** Push to GitHub and connect to Vercel. Set `REACT_APP_API_URL` in Vercel dashboard.

## Folder Structure
```
Echo-aTwitterClone/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── ...
├── frontend/
│   └── twitterclone/
│       ├── src/
│       ├── public/
│       ├── build/
│       └── ...
├── README.md
└── ...
```

## Security & Production Notes
- All secrets are loaded from environment variables and never committed.
- CORS is restricted to Vercel and localhost.
- Cookies are set for cross-origin and secure contexts.
- Auth endpoints are rate-limited.
- All API calls have error handling.

---

**Made with ❤️ by MinitJain**
