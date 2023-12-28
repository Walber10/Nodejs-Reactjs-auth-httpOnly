import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (!err) {
    return next();
  }
  res.status(500).send("Internal Server Error");
}

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
