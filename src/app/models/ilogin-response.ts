import { IUserResponse } from "./iuser-response";

export interface ILoginResponse {
  status:number,
  response:{
    accessToken:string,
    utente:IUserResponse
  }
}
