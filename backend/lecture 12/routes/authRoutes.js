import { Router } from "express";
import AuthController from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// in routes the best way to write APIs (not camelCase) -> all smalletter and separate between them by slash
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/get-current-login-info",authenticate, AuthController.register);
router.post("/change-password", AuthController.changePassword);

export default router;
