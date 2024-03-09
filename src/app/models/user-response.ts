import { UserLoginResponse } from "./user-login-response";

export interface UserResponse {
  jwt:string,
  user:UserLoginResponse,
}
