import express from "express";
import { enrolledCourse, getUser, login, register } from "../controllers/user.js";

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

router.get('/:userId', getUser);
router.patch('/enroll', enrolledCourse);

export default router;