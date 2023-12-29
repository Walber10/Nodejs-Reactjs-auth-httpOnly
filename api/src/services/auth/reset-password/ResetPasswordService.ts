import { hash } from "bcrypt";
import { isAfter, addHours } from "date-fns";
import { AppError } from "../../../middleware/error-handler";
import { getUserById } from "../../user/user-service";
import { verifyToken } from "../../../controller/jwt.controller";
import AppDataSource from "../../../data-source";
import { User } from "../../../entities/User";

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<User> {
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded == "string") {
      throw new AppError("User Token does not exists.", 401);
    }

    const user = await getUserById(Number(decoded.id));
    if (!user) {
      throw new AppError("User Token does not exists.");
    }

    const tokenExp = decoded.exp;
    if (!tokenExp) {
      throw new AppError("Token expiration not found.");
    }
    const tokenCreatedAt = new Date(tokenExp * 1000);
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired.");
    }

    user.password = await hash(password, 8);
    await AppDataSource.manager.save(user);
    return user;
  }
}
