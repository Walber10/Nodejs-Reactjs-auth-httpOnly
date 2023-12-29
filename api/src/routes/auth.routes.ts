import { Router } from "express";
import {
  forgotPassword,
  loginUser,
  registerUser,
} from "../controller/auth.controller";
import { loginSchema } from "../schema/auth.schema";
import verifySchema from "../middleware/validateResource";
import { createUserSchema, forgotPasswordSchema } from "../schema/user.schema";

const authRoutes = Router();

authRoutes.post("/login", verifySchema(loginSchema), loginUser);
authRoutes.post("/register", verifySchema(createUserSchema), registerUser);
authRoutes.post(
  "/forgotpassword",
  verifySchema(forgotPasswordSchema),
  forgotPassword
);

export default authRoutes;
