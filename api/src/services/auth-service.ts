import bcrypt from "bcrypt";
import { User } from "../entities/User";
import AppDataSource from "../data-source";
import { getUserByEmail } from "./user-service";
import { CreateUserInput } from "../schema/user.schema";
import { createToken } from "../controller/jwt.controller";
import { AppError } from "../middleware/error-handler";

export const registerUser = async (userData: CreateUserInput) => {
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {
      throw new AppError("User already exists");
    }
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const newUser = User.create({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
      mobile: userData.mobile,
    });
    const token = createToken({ email: newUser.email }, true);
    await AppDataSource.manager.save(newUser);
    return { access_token: token.access_token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const validatePassword = bcrypt.compareSync(password, user.password);
  if (!validatePassword) {
    throw new AppError("Credentials does not match", 404);
  }

  const token = createToken({ email: user.email }, true);
  return { user, access_token: token.access_token };
};
