import AppDataSource from "../../../data-source";
import { AppError, getErrorMessage } from "../../../middleware/error-handler";
import { verifyToken } from "../../../middleware/JwtService";
import { getUserById } from "../../user/user-service";

export const verifyUserByEmailToken = async (token: string) => {
  try {
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === "string") {
      throw new Error("User Token does not exist.");
    }

    const user = await getUserById(Number(decoded.id));
    if (!user) {
      throw new AppError("User Token does not exist.");
    }

    user.verified = true;
    await AppDataSource.manager.save(user);

    return {
      success: true,
      message: "The account has been verified. Please log in.",
    };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
