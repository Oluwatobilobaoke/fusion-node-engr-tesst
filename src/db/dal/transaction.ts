import { Transaction } from "../models";
import { TransactionInput, TransactionOutput } from "../models/Transaction";


export const create = async (payload: TransactionInput): Promise<TransactionOutput> => {
  const transaction = await Transaction.create(payload);

  return {
    success: true,
    data: transaction,
  };
};