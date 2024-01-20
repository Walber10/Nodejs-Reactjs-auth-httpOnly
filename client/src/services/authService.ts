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
  useForgotPasswordMutation,
} = AuthAPI;
