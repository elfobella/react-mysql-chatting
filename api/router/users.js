import express from "express";
import { getProfileUser, getUser } from "../controller/user.js";

const router = express.Router();

router.get("/users", getUser);
router.get("/profile/:userId", getProfileUser);

export default router;
