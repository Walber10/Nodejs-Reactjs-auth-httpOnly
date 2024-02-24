import transformResponse, {
  APIData,
  APIPayload,
} from "./helpers/transformResponse";
import { API } from "./apiService";
import { RegisterUserRequest } from "../common/model/User";

export interface LoginRequest {
  email: string;
  password: string;
}
export interface AuthResponse {
  token: string;
  userName: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  password: string;
  confirmPassword: string;
  token: string;
}

interface RefreshTokenResponse {
  token: string;
}

export const AuthAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getAuth: builder.query<
      APIData<{ message?: string | undefined; isAuth: boolean }>,
      APIPayload<void>
    >({
      query: () => `/auth`,
      providesTags: ["auth"],
    }),
    signIn: builder.mutation<AuthResponse, APIPayload<LoginRequest>>({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
    }),
    signUp: builder.mutation<AuthResponse, APIPayload<RegisterUserRequest>>({
      query: (body) => ({
        url: `/register`,
        method: "POST",
        body,
      }),
    }),
    logOut: builder.mutation<unknown, APIPayload<void>>({
      query: () => ({
        url: `/logout`,
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation<
      unknown,
      APIPayload<ForgotPasswordRequest>
    >({
      query: (body) => ({
        url: `/forgotpassword`,
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<unknown, APIPayload<ResetPasswordRequest>>({
      query: (body) => ({
        url: `/resetpassword`,
        method: "POST",
        body,
      }),
    }),
    refreshToken: builder.mutation<
      APIData<RefreshTokenResponse>,
      APIPayload<void>
    >({
      query: (body) => ({
        url: `/auth/refresh-token`,
        method: "POST",
        body,
      }),
      transformResponse,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAuthQuery,
  useSignInMutation,
  useSignUpMutation,
  useLogOutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = AuthAPI;
