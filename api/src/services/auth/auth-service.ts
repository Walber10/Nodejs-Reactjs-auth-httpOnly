import bcrypt from "bcrypt";
import { getUserByEmail } from "../user/user-service";
import { createTokenService } from "../../middleware/JwtService";
import { AppError } from "../../middleware/error-handler";
import { Response } from "express";

export const loginUserService = async (
  email: string,
  password: string,
  res: Response
) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const validatePassword = bcrypt.compareSync(password, user.password);
  if (!validatePassword) {
    throw new AppError("Credentials does not match", 400);
  }

  const token = createTokenService({ email: user.email }, true, res);

  return { user, access_token: token.access_token };
};
