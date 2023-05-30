import express from "express";
import { login, logout, register, removeUser } from "../controllers/users.controller.js";
import { authenticateUser } from "../middleware/authUser.js";

const router = express.Router();
router.post('/login', login);
router.post('/register', register);
router.delete('/', authenticateUser, removeUser);
router.post('/logout', authenticateUser, logout);

export default router;