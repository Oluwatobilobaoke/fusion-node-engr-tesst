import { TransactionInput, TransactionOutput } from "../models/Transaction";
import { Account } from "../models";
import { decreaseBalance, increaseBalance } from "../dal/account";
import * as transactionDal from "../dal/transaction";
import { Txn_Type } from "../../api/interfaces";

import { Transaction } from "sequelize";

interface TransactionData extends Partial<TransactionInput> {}

export const creditAccount = async (
  payload: TransactionInput,
  t: Transaction
): Promise<TransactionOutput> => {
  const account = await Account.findOne({ where: { id: payload.account_id } });

  if (!account) {
    return {
      success: false,
      message: "Account does not exist",
      data: {},
    };
  }

  await increaseBalance(Number(account.id), Number(payload.amount));

  console.log("HERE 1");

  const trr = await transactionDal.create({
    txn_type: payload.txn_type,
    purpose: payload.purpose,
    amount: payload.amount,
    account_id: Number(account.id),
    reference: payload.reference,
    metadata: payload.metadata,
    balance_before: Number(account.balance),
    balance_after: Number(account.balance) + Number(payload.amount),
  });

  console.log(trr);
  console.log("HERE 2");
  return {
    success: true,
    message: "Credit successful",
    data: {},
  };
};

export const debitAccount = async (
  payload: TransactionInput,
  t: Transaction
): Promise<TransactionOutput> => {
  const account = await Account.findOne({ where: { id: payload.account_id } });

  if (!account) {
    return {
      success: false,
      message: "Account does not exist",
      data: {},
    };
  }

  if (Number(account.balance) < payload.amount) {
    return {
      success: false,
      message: "Insufficient balance",
      data: {},
    };
  }

  await decreaseBalance(Number(account.id), Number(payload.amount));

  const tr = await transactionDal.create({
    txn_type: payload.txn_type,
    purpose: payload.purpose,
    amount: payload.amount,
    account_id: payload.account_id,
    reference: payload.reference,
    metadata: payload.metadata,
    balance_before: Number(account.balance),
    balance_after: Number(account.balance) - Number(payload.amount),
  });

  return {
    success: true,
    message: "Debit successful",
    data: {},
  };
};
