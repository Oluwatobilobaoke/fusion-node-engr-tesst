import * as accountDal from "../dal/account";
import { AccountInput, AccountOutput } from "../models/Account";

export const createAccount = async (
  payload: AccountInput
): Promise<AccountOutput> => {
  return accountDal.create(payload);
};

export const getAccount = async (id: number, isUserId: boolean): Promise<AccountOutput> => {
  if (isUserId) {
    return accountDal.getByUserID(id)
  }
  return accountDal.getById(id)
}

export const modifyUserBalance =async (id: number, amount: number, isIncrement: boolean): Promise<AccountOutput> => {

  if (isIncrement) {
    return accountDal.increaseBalance(id, amount)
  }
  return accountDal.decreaseBalance(id, amount)
}