import express from "express";
import { CreateCourse, getAllCourse, getCourseByParams, updateCourseStatus } from "../controllers/course.js";

const router = express.Router();

router.post('/', CreateCourse);

router.get('/', getAllCourse);
router.get('/:courseId', getCourseByParams);

router.patch('/', updateCourseStatus);

export default router;