export interface RouteResponse<T> {
  success: boolean;
  code: number;
  message: string;
  error: string | null;
  data: T | null;
}
export interface AuthRouteResponse {
  id: number;
  username: string;
  accessToken: string;
}
