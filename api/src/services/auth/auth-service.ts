import bcrypt from "bcrypt";
import { getUserByEmail } from "../user/user-service";
import { createToken } from "../jwt/JwtService";
import { AppError } from "../../middleware/error-handler";



export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const validatePassword = bcrypt.compareSync(password, user.password);
  if (!validatePassword) {
    throw new AppError("Credentials does not match", 400);
  }

  const token = createToken({ email: user.email }, true);
  return { user, access_token: token.access_token };
};
