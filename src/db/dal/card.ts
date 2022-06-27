import { isEmpty } from "lodash";
import { CardTransaction } from "../models";
import { CardTransactionInput, CardTransactionOutput } from "../models/CardTransaction";

export const create = async (payload: CardTransactionInput): Promise<CardTransactionOutput> => {
  const account = await CardTransaction.create(payload);

  return {
    success: true,
    data: account,
  };
};

export const update = async (
  id: number,
  payload: Partial<CardTransactionInput>
): Promise<CardTransactionOutput> => {
  const cardTransaction = await CardTransaction.findByPk(id);

  if (!cardTransaction) {
    return {
      success: false,
      message: "card transaction does not exist",
      data: {}
    }
  }

  const updatedcardTransaction = await cardTransaction.update(payload);
  return {
    success: true,
    data: updatedcardTransaction,
  };
};

export const getById = async (id: number): Promise<CardTransactionOutput> => {
  const cardTransaction = await CardTransaction.findByPk(id);

    if (!cardTransaction) {
      return {
        success: false,
        message: "card transaction does not exist",
        data: {}
      }
    }

  return {
    success: true,
    data: cardTransaction,
  };
};