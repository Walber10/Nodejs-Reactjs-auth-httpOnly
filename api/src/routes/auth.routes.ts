import { Router } from "express";
import { loginUser, registerUser } from "../controller/auth.controller";
import { loginSchema } from "../schema/auth.schema";
import verifySchema from "../middleware/validateResource";
import {
  createUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from "../schema/user.schema";

const authRoutes = Router();

authRoutes.post("/login", verifySchema(loginSchema), loginUser);
authRoutes.post("/register", verifySchema(createUserSchema), registerUser);
authRoutes.post(
  "/users/verify/:id/:verificationCode",
  verifySchema(verifyUserSchema)
);
authRoutes.post("/users/forgotpassword", verifySchema(forgotPasswordSchema));
authRoutes.post(
  "/users/resetpassword/:id/:passwordResetCode",
  verifySchema(resetPasswordSchema)
);

export default authRoutes;
