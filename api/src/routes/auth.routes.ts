import { Router } from "express";
import { login } from "../controller/auth.controller";
import { createSessionSchema } from "../schema/auth.schema";
import verifySchema from "../middleware/validateResource";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from "../schema/user.schema";

const authRoutes = Router();

authRoutes.post("/login", verifySchema(createSessionSchema), login);
authRoutes.post(
  "/users/verify/:id/:verificationCode",
  verifySchema(verifyUserSchema)
);
authRoutes.post(
  "/users/forgotpassword",
  verifySchema(forgotPasswordSchema)
);
authRoutes.post(
  "/users/resetpassword/:id/:passwordResetCode",
  verifySchema(resetPasswordSchema)
);

export default authRoutes;
