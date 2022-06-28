import { Transaction } from "../models";
import { TransactionInput, TransactionOutput } from "../models/Transaction";

export const create = async (
  payload: TransactionInput
): Promise<TransactionOutput> => {
  const transaction = await Transaction.create(payload);

  return {
    success: true,
    data: transaction,
  };
};

export const getByRef = async (ref: string): Promise<TransactionOutput> => {
  const transaction = await Transaction.findOne({ where: { reference: ref } });

  if (!transaction) {
    return {
      success: false,
      message: "Could not find transaction",
      data: {},
    };
  }

  return {
    success: true,
    data: transaction,
  };
};
