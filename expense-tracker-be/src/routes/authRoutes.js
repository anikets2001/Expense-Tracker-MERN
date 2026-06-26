import express from 'express';
import { signIn, signUp, getMe, googleSignIn } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', googleSignIn);
router.get('/me', protect, getMe);

export default router;