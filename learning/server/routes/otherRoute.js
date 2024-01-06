import express from 'express';
import { contactForm, courseRequestForm } from '../controllers/otherController.js';
import { authorizeAdmin, isAuthenticated, getAdminDashboardDetails } from '../middlewares/Auth/auth.js';

const router = express.Router();

router.route('/contact').post(contactForm);
router.route('/courserequest').post(courseRequestForm);
router.route('/admin/stats').get(isAuthenticated, authorizeAdmin, getAdminDashboardDetails);

export default router;