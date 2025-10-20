import express from "express";
import {
  bookmark,
  follow,
  getOtherUserProfile,
  GetUserProfile,
  Login,
  logout,
  Register,
  unfollow,
  updateProfile,
  getLoggedInUser,
} from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.get("/me", isAuthenticated, getLoggedInUser);
router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", logout);
router.put("/bookmark/:id", isAuthenticated, bookmark);
router.route("/profile/:id").get(isAuthenticated, GetUserProfile);
router.put("/update/:id", isAuthenticated, updateProfile);
router.get("/otherusers/:id", isAuthenticated, getOtherUserProfile);
router.post("/follow/:id", isAuthenticated, follow);
router.post("/unfollow/:id", isAuthenticated, unfollow);

export default router;
