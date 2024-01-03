import express from 'express';
import { addLecture, createCourse, getAllCourses, getCourseLecture } from '../controllers/courseController.js';
import singleUplaod from '../middlewares/Multer/multer.js';

const router = express.Router();

router.route('/courses').get(getAllCourses);
router.route('/createcourse').post(singleUplaod, createCourse);
router.route('/course/:id').get(getCourseLecture);
router.route('/course/:id').post(singleUplaod, addLecture);

export default router;