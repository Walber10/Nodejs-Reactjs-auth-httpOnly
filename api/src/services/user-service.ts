import { User } from "../entities/User";
import AppDataSource from "../data-source";

export const getUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

export const getUserById = async (id: number) => {
  try {
    return await User.findOne({ where: { id } });
  } catch (error) {
    throw new Error('Error fetching user');
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await User.findOne({ where: { email } });
  } catch (error) {
    throw new Error('Error fetching user by email');
  }
};

export const updateUser = async (id: number, userData: any) => {
  try {
    const user = await User.update(id, userData);
    return user;
  } catch (error) {
    throw new Error('Error updating user');
  }
};

export const deleteUser = async (id: number) => {
  try {
    const user = await User.findBy({ id });
    if (!user) {
      return null; 
    }
    await AppDataSource.manager.delete(User, id);
    return user;
  } catch (error) {
    throw new Error('Error deleting user');
  }
};
