import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";

const router = Router();

router.post("/register", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/forgotpassword", AuthController.forgotPassword);
router.post("/reset", AuthController.resetPassword);

export default router;
