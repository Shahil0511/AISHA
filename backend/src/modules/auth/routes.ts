import { Router } from "express";
import { AuthController } from "./controllers.js";

const router = Router();

router.post("/signup/request-otp", AuthController.requestOtp);
router.post("/signup/verify-otp", AuthController.verifyOtp);
router.post("/login", AuthController.login);

export default router;
