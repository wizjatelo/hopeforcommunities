import express from "express";
import { donateViaMpesa, mpesaCallback } from "../controllers/mpesaController.js";

const router = express.Router();

router.post("/stkpush", donateViaMpesa);
router.post("/callback", mpesaCallback);

export default router;
