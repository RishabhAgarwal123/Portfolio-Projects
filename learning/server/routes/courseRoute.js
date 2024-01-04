import express from 'express';
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLecture } from '../controllers/courseController.js';
import { authorizeAdmin, isAuthenticated } from '../middlewares/Auth/auth.js';
import singleUplaod from '../middlewares/Multer/multer.js';

const router = express.Router();

router.route('/courses').get(getAllCourses);
router.route('/createcourse').post(isAuthenticated, authorizeAdmin, singleUplaod, createCourse);
router.route('/course/:id').get(isAuthenticated, getCourseLecture);
router.route('/course/:id').post(isAuthenticated, authorizeAdmin, singleUplaod, addLecture);
router.route('/course/:id').delete(isAuthenticated, authorizeAdmin, deleteCourse);
router.route('/lecture').delete(isAuthenticated, authorizeAdmin, deleteLecture);

export default router;