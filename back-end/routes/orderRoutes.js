import express from "express";
import authenticate from "../middlewares/authMiddleware.js";
import { isBuyer,  isAdmin } from "../middlewares/roleMiddleware.js";

import {
  purchaseSweet,
  getPendingOrders,
  getPreparingOrders,
  getDeliveredOrders,
  startPreparingOrder,
  deliverOrder,
  getUserOrders
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/sweets/:id/purchase", authenticate, isBuyer, purchaseSweet);


router.get("/pending", authenticate, isAdmin, getPendingOrders);

router.get("/preparing", authenticate, isAdmin, getPreparingOrders);

router.get("/delivered", authenticate,  isAdmin, getDeliveredOrders);


router.put("/:id/start", authenticate,  isAdmin, startPreparingOrder);

router.put("/:id/deliver", authenticate,  isAdmin, deliverOrder);


router.get("/my", authenticate, isBuyer, getUserOrders);

export default router;
