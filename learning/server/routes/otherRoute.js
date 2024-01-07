import express from 'express';
import { contactForm, courseRequestForm, getAdminDashboardDetails } from '../controllers/otherController.js';
import { authorizeAdmin, isAuthenticated } from '../middlewares/Auth/auth.js';

const router = express.Router();

router.route('/contact').post(contactForm);
router.route('/courserequest').post(courseRequestForm);
router.route('/admin/stats').get(isAuthenticated, authorizeAdmin, getAdminDashboardDetails);

export default router;