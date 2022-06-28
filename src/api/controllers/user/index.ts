import * as service from "../../../db/services/userService"; for war again
import * as mapper from "./mapper";
import { UserInput } from "../../../db/models/User";

export interface LoginAttributes {
  email: string;
  password: string;
}

export const createUser = async (
  payload: UserInput
): Promise<mapper.UserOptOutput> => {
  return mapper.toUser(await service.create(payload));
};

export const loginUser = async (
  payload: LoginAttributes
): Promise<mapper.UserOptOutput> => {
  return mapper.toUser(await service.login(payload));
};
