import express from 'express';
import { createCourse, getAllCourses, getCourseDetail, getCourseLecture } from '../controllers/courseController.js';

const router = express.Router();

router.route('/courses').get(getAllCourses);
router.route('/createcourse').post(createCourse);
router.route('/course/:id').get(getCourseLecture);

export default router;