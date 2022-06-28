import { getAccount } from "./../../../db/services/accountService";
import * as accountService from "../../../db/services/accountService";
import * as flutterwaveService from "../../../db/services/flutterwaveService";
import * as mapper from "./mapper";

export interface TransferAttributes {
  sender_id: number;
  recipient_id: string;
  amount: number;
}

export interface AccountInfo {
  id: number;
  isUserId: boolean;
}

export const transferMoney = async (
  payload: TransferAttributes
): Promise<mapper.TransactionOptOutput> => {
  return mapper.toTransaction(
    await accountService.transfer(
      payload.sender_id,
      payload.recipient_id,
      payload.amount
    )
  );
};

export const getUserAccount = async (
  payload: AccountInfo
): Promise<mapper.AccountOptOutput> => {
  if (payload.isUserId) {
    return mapper.toAccount(
      await accountService.getAccount(payload.id, payload.isUserId)
    );
  }
  return mapper.toAccount(
    await accountService.getAccount(payload.id, payload.isUserId)
  );
};

export const paymentLink = async (payload: flutterwaveService.Payload) => {
  return await flutterwaveService.generatePaymentLink(payload);
};

export const verifyPayment = async (
  payload: flutterwaveService.VerifyPayload
) => {
  return await flutterwaveService.verifyPayment(payload);
};

export const WebHook = async (payload: any) => {
  return await flutterwaveService.webhook(payload);
};
