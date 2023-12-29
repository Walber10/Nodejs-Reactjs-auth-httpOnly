import { UpdateResult } from "typeorm";
import AppDataSource from "../../data-source";
import { User } from "../../entities/User";
import { AppError, getErrorMessage } from "../../middleware/error-handler";
import { CreateUserInput } from "../../schema/user.schema";

export const createUserService = async (
  userData: CreateUserInput
): Promise<User> => {
  const user = User.create(userData);
  await AppDataSource.manager.save(user);
  return user;
};

export const getAllUsersService = async (): Promise<User[]> => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    return await User.findOne({ where: { id } });
  } catch (error) {
    throw new Error("Error fetching user");
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    return await User.findOne({ where: { email } });
  } catch (error) {
    throw new Error("Error fetching user by email");
  }
};

export const deleteUserService = async (id: number): Promise<void> => {
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new AppError("User not found.", 404);
    }
    await AppDataSource.manager.delete(User, id);
  } catch (error) {
    throw new AppError(getErrorMessage(error), 500);
  }
};
