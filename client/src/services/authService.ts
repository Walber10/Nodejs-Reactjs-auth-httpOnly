import transformResponse, {
  APIData,
  APIPayload,
} from "./helpers/transformResponse";
import { API } from "./apiService";

export interface LoginRequest {
  email: string;
  password: string;
}
export interface AuthResponse {
  token: string;
  userName: string;
}

interface RefreshTokenResponse {
  token: string;
}

export const AuthAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, APIPayload<LoginRequest>>({
        query: (body) => ({
        url: `/login`,
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

export const { useSignInMutation } = AuthAPI;
