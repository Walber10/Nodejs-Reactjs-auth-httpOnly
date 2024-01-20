import { Router } from "express";
import {
  authController,
  emailVerificationController,
  forgotPasswordController,
  resetPasswordController,
  loginController,
} from "../controller/auth.controller";
import { loginRequestSchema } from "../schema/auth.schema";
import verifySchema from "../middleware/validateResource";
import { createUserSchema, forgotPasswordSchema } from "../schema/user.schema";
import { registerUserController } from "../controller/user.controller";
import { isAuth } from "../middleware/JwtService";

const authRoutes = Router();

authRoutes.get("/auth", isAuth, authController);
authRoutes.post("/login", verifySchema(loginRequestSchema), loginController);
authRoutes.post(
  "/register",
  verifySchema(createUserSchema),
  registerUserController
);
authRoutes.post(
  "/forgotpassword",
  verifySchema(forgotPasswordSchema),
  forgotPasswordController
);
authRoutes.post("/resetpassword", (req, res) => {
  resetPasswordController(req, res);
});
authRoutes.post("/emailverification/:token", (req, res) => {
  emailVerificationController(req, res);
});

export default authRoutes;
