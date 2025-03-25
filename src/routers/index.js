import express from 'express';

import authRoutes from './auth.js';
import contactRoutes from './contacts.js';
import { auth } from '../middlewares/authenticate.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/contacts', auth, contactRoutes);

export default router;
