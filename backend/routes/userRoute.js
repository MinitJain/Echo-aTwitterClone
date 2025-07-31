import express from "express";
import { Register } from "../controllers/userController.js";
import { Login } from "../controllers/userController.js";

const router = express.Router();
router.post("/register", Register);
router.post("/login", Login);

export default router;
