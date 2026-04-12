import type { LoggingInUserDto } from "./dtos";
import { http } from "../config";

export interface IUserService {
  getUserInfo: () => Promise<LoggingInUserDto>;
}

export const UserService: IUserService = {
  async getUserInfo(): Promise<LoggingInUserDto> {
    return http.get("/users/me");
  }
}