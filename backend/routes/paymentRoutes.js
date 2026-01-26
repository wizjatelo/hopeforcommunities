import express from "express";
import { processCardPayment, getPaymentStatus } from "../controllers/paymentController.js";

const router = express.Router();

// Process credit card payment
router.post("/card", processCardPayment);

// Get payment status
router.get("/status/:paymentId", getPaymentStatus);

export default router;