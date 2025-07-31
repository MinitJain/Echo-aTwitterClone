import express from "express";
import { logout, Register } from "../controllers/userController.js";
import { Login } from "../controllers/userController.js";

const router = express.Router();
router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", logout);

export default router;
