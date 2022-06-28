import { TransactionOutput } from "./../models/Transaction";
import * as accountDal from "../dal/account";
import * as userDal from "../dal/user";

import { AccountInput, AccountOutput } from "../models/Account";
import { Transaction } from "sequelize";
import sequelizeConnection from "../config";
import { creditAccount, debitAccount } from "./transactionService";
import { Txn_Type } from "../../api/interfaces";
import { checkUserIsBeneficiary } from "../dal/beneficiary";

export const createAccount = async (
  payload: AccountInput
): Promise<AccountOutput> => {
  return accountDal.create(payload);
};

export const getAccount = async (
  id: number,
  isUserId: boolean
): Promise<AccountOutput> => {
  if (isUserId) {
    return accountDal.getByUserID(id);
  }
  return accountDal.getById(id);
};

export const modifyUserBalance = async (
  id: number,
  amount: number,
  isIncrement: boolean
): Promise<AccountOutput> => {
  if (isIncrement) {
    return accountDal.increaseBalance(id, amount);
  }
  return accountDal.decreaseBalance(id, amount);
};

export const transfer = async (
  sender_id: number,
  recipient_id: string,
  amount: number
): Promise<TransactionOutput> => {
  const checkSenderExists = await userDal.getById(sender_id);

  const checkRecipientExists = await userDal.getByEmail(recipient_id);

  console.log({ checkRecipientExists });

  if (
    checkSenderExists.success === false ||
    checkRecipientExists.success === false
  ) {
    return {
      success: false,
      message: "User or Recipient Does not exist",
      data: {},
    };
  }

  const checkRecipientIsBen = await checkUserIsBeneficiary(
    sender_id,
    String(checkRecipientExists.data.email)
  );

  if (!checkRecipientIsBen) {
    return {
      success: false,
      message:
        "Recipient must be your beneficiary before you can transfer money",
      data: {},
    };
  }

  const t = await sequelizeConnection.transaction();

  try {
    const reference = "reference-ydm-" + Date.now();

    const transferResult = await Promise.all([
      debitAccount(
        {
          amount,
          account_id: sender_id,
          txn_type: Txn_Type.debit,
          purpose: "transfer",
          reference,
          metadata: {
            info: String(recipient_id),
          },
        },
        t
      ),
      creditAccount(
        {
          amount,
          account_id: Number(checkRecipientExists.data.id),
          txn_type: Txn_Type.credit,
          purpose: "transfer",
          reference,
          metadata: {
            info: String(sender_id),
          },
        },
        t
      ),
    ]);

    const [debitRes, creditRes] = transferResult;

    // const failedTxns = transferResult.filter((result) => !result.success);

    if (!debitRes.success) {
      await t.rollback();
      return {
        success: debitRes.success,
        message: debitRes.message || "An error occurred",
        data: debitRes.data,
      };
    }

    if (!creditRes.success) {
      await t.rollback();
      return {
        success: creditRes.success,
        message: creditRes.message || "An error occurred",
        data: creditRes.data,
      };
    }

    await t.commit();
    return {
      success: true,
      message: "transfer successful",
      data: {},
    };
  } catch (error) {
    await t.rollback();

    return {
      success: false,
      message: "internal server error",
      data: {},
    };
  }
};

// export const deposit =async (params:type) => {

// }
