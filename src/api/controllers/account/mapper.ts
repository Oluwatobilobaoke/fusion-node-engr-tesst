import { AccountOutput } from "../../../db/models/Account";
import { TransactionOutput } from "../../../db/models/Transaction";

export interface AccountOptOutput extends AccountOutput {}

export interface TransactionOptOutput extends TransactionOutput {}

export const toAccount = (data: AccountOutput): AccountOptOutput => {
  const account = data.data;
  
  return {
    success: data.success,
    message: data.message,
    data: {
      id: account.id,
      user_id: account.user_id,
      UserId: account.UserId,
      balance: account.balance,
      transactions: account.transactions,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      deletedAt: account.deletedAt,
    },
  };
};
export const toTransaction = (data: TransactionOutput): TransactionOptOutput => {
  const transaction = data.data;

  return {
    success: data.success,
    message: data.message,
    data: {
      id: transaction.id,
      txn_type: transaction.txn_type,
      purpose: transaction.purpose,
      amount: transaction.amount,
      account_id: transaction.account_id,
      reference: transaction.reference,
      balance_before: transaction.balance_before,
      balance_after: transaction.balance_after,
      metadata:  transaction.metadata,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      deletedAt: transaction.deletedAt,
    },
  };
};

