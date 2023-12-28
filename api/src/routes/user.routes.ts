import express from "express";
import { createUserSchema } from "../schema/user.schema";
import verifySchema from "../middleware/validateResource";
import authenticateUser from "../middleware/authenticate-user";
import { createUser, deleteUser, getUsers } from "../controller/user.controller";

const userRoutes = express.Router();

userRoutes.post("/user", verifySchema(createUserSchema), createUser);
userRoutes.get("/user", authenticateUser, getUsers);
userRoutes.delete("/:id", authenticateUser, deleteUser);

export default userRoutes;
