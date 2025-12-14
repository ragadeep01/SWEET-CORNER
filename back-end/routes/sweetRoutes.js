import express from 'express';
import {  createSweet, updateSweet, deleteSweet, getMySweets, allSweets} from '../controllers/sweetController.js';
import authenticate  from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();
// router.post('/',upload.single('image'), createCrop); // <-- added multer middleware
router.post('/sweets', authenticate,isAdmin, upload.single('image'), createSweet);

// router.route("/addcrop").post(authenticate ,createCrop);

router.route("/sweets/:id").put(authenticate ,isAdmin,  upload.single('image'), updateSweet);
router.route("/sweets/:id").delete(authenticate ,isAdmin, deleteSweet);
router.route("/mysweets").get(authenticate, getMySweets);
router.route("/sweets").get(authenticate, allSweets);

export default router;