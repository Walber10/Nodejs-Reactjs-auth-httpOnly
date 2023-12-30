import { Router } from "express";
import {
  forgotPasswordController,
  getResetPasswordController,
  loginController,
} from "../controller/auth.controller";
import { loginSchema } from "../schema/auth.schema";
import verifySchema from "../middleware/validateResource";
import { createUserSchema, forgotPasswordSchema } from "../schema/user.schema";
import { registerUserController } from "../controller/user.controller";

const authRoutes = Router();

authRoutes.post("/login", verifySchema(loginSchema), loginController);
authRoutes.post(
  "/register",
  verifySchema(createUserSchema),
  registerUserController,
);
authRoutes.post(
  "/forgotpassword",
  verifySchema(forgotPasswordSchema),
  forgotPasswordController,
);

authRoutes.get("/resetpassword/:token", (req, res) => {
  getResetPasswordController(req, res);
});

export default authRoutes;
