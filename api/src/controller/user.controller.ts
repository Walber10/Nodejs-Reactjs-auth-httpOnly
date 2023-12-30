import { Request, Response } from "express";
import { User } from "../entities/User";
import AppDataSource from "../data-source";
import { AppError, getErrorMessage } from "../middleware/error-handler";
import {
  CreateUserInput,
  UserResponse,
  userResponseSchema,
} from "../schema/user.schema";
import { createTokenService } from "../services/jwt/JwtService";
import { hash } from "bcrypt";
import {
  createUserService,
  getUserByEmail,
} from "../services/user/user-service";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      password,
      passwordConfirmation,
      email,
      mobile,
    }: CreateUserInput = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new AppError("User already exists", 400);
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await createUserService({
      firstName,
      lastName,
      password: hashedPassword,
      passwordConfirmation,
      mobile,
      email,
    });

    const token = createTokenService({ email: newUser.email }, true);

    return res.status(201).json({
      token: token.access_token,
    });
  } catch (error) {
    throw new AppError(getErrorMessage(error), 500);
  }
};

export const getUsersController = async (
  req: Request,
  res: Response<UserResponse[]>,
) => {
  try {
    const users = await User.find();
    const userResponse = users.map((user) => userResponseSchema.parse(user));
    return res.status(200).json(userResponse);
  } catch (error) {
    throw new AppError(getErrorMessage(error), 500);
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const user = await User.findBy({ id: parseInt(req.params.id) });
  if (!user) {
    return res.status(404).send({ errors: { message: "User not found" } });
  }
  await AppDataSource.manager.delete(User, req.params.id);
  return res.status(200).json({
    message: "User deleted successfully",
  });
};
