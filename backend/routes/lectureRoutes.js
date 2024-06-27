// ./routes/lectureRoutes.js
import express from 'express';
import { createLecture, getLectures } from '../controllers/lectureController.js'; // Use ES module syntax
import auth from '../middleware/authMiddleware.js'; // Use ES module syntax
import authorize from '../middleware/roleMiddleware.js'; // Use ES module syntax

const router = express.Router();

router.post('/', auth, authorize(['admin', 'teacher']), createLecture);
router.get('/', auth, getLectures);

export default router; // Use export default
