import express from 'express';
import { createUser, loginUser,logOutCurrentUser , getCurrentUserProfile,updateCurrentUserProfile} from '../controllers/userController.js';

import authenticate from '../middlewares/authMiddleware.js';

// import{authenticate} from '../middleware/authMiddleware.js'
const router = express.Router();

router.route("/auth/signup").post(createUser);
router.post("/auth/login",loginUser);
router.post("/auth/logout",logOutCurrentUser);
router.route('/profile')
.get(authenticate, getCurrentUserProfile)
.put(authenticate, updateCurrentUserProfile);
export default router;
