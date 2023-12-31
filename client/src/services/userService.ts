import { API } from "./apiService";
import transformResponse, {
  APIData,
  APIPayload,
} from "./helpers/transformResponse";

interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
}


export const UserAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<APIData<UserResponse[]>, APIPayload<void>>({
      query: () => `/users`,
      transformResponse,
      providesTags: ["userTag"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery } = UserAPI;
