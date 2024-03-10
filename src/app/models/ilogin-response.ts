import { IUserResponse } from "./iuser-response";

export interface ILoginResponse {
  accessToken:string,
  user:IUserResponse
}
