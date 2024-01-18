import { object, string, TypeOf } from "zod";

export const loginRequestSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email or password"),
    password: string({
      required_error: "Password is required",
    }).min(6, "Invalid email or password"),
  }),
});

export const loginResponseSchema = object({
  body: object({
    userName: string(),
    token: string(),
  }),
});


export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email"),
  }),
});


export type LoginRequest = TypeOf<typeof loginRequestSchema>["body"];
export type LoginResponse = TypeOf<typeof loginResponseSchema>["body"];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
