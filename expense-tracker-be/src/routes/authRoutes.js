import express from 'express';
import { signIn, signUp, getMe } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/me', protect, getMe);

export default router;