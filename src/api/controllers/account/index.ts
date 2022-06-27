import { getAccount } from './../../../db/services/accountService';
import * as accountService from "../../../db/services/accountService"
import * as mapper from "./mapper"
import { id } from 'ethers/lib/utils';

export interface TransferAttributes {
  sender_id: number, 
  recipient_id: string, 
  amount: number
}

export interface AccountInfo {
  id: number,
  isUserId: boolean
}

export const transferMoney = async (payload: TransferAttributes ): Promise<mapper.TransactionOptOutput> => {
  return mapper.toTransaction(await accountService.transfer(payload.sender_id, payload.recipient_id, payload.amount));
}

export const getUserAccount = async (payload: AccountInfo): Promise<mapper.AccountOptOutput> => {
  if (payload.isUserId) {
    return mapper.toAccount(await accountService.getAccount(payload.id, payload.isUserId))
  }
  return mapper.toAccount(await accountService.getAccount(payload.id, payload.isUserId))
}