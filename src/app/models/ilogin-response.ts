import { IUserResponse } from "./iuser-response";

export interface ILoginResponse {
  status:number,
  response:{
    accessToken:string,
    user:IUserResponse
  }
}
