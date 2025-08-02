import express from "express";
import {
  bookmark,
  Login,
  logout,
  Register,
} from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();
router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", logout);
router.put("/bookmark/:id", isAuthenticated, bookmark);

export default router;
