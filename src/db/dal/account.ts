
import { isEmpty } from "lodash";

import { Account, Transaction } from "../models";
import { AccountInput, AccountOutput } from "../models/Account";


export const checkAccountExists = async (id: number): Promise<boolean> => {
  const account = await Account.findByPk(id)

  return !isEmpty(account);
};
export const create = async (payload: AccountInput): Promise<AccountOutput> => {
  const account = await Account.create(payload);

  return {
    success: true,
    data: account,
  };
};


export const update = async (
  id: number,
  payload: Partial<AccountInput>
): Promise<AccountOutput> => {
  const account = await Account.findByPk(id);

  if (!account) {
    // @todo throw custom error
    throw new Error("not found");
  }

  const updatedAccount = await account.update(payload);
  return {
    success: true,
    data: updatedAccount,
  };
};

export const increaseBalance = async (id: number, amount: number): Promise<AccountOutput> => {
  const account = await Account.findByPk(id)

  if (!account) {
    return {
      success: false,
      message: "Account does not exist",
      data: {}
    }
  }

  await account?.increment({
    balance: amount
  })

  return {
    success: true,
    data: account
  }
}

export const decreaseBalance = async (id: number, amount: number): Promise<AccountOutput> => {
  const account = await Account.findByPk(id)

  if (!account) {
    return {
      success: false,
      message: "Account does not exist",
      data: {}
    }
  }

  await account?.decrement({
    balance: amount
  })

  return {
    success: true,
    data: account
  }
}

export const getById = async (id: number): Promise<AccountOutput> => {
  const account = await Account.findByPk(id);

  if (!account) {
    // @todo throw custom error
    return {
      success: false,
      message: "Account does not exist",
      data: {}
    }
  }

  return {
    success: true,
    data: account ,
  };
};

export const getByUserID = async (id: number): Promise<AccountOutput> => {
  const account = await Account.findOne({
    where: { user_id: id },
    include: [
      {
        model: Transaction,
        // attributes: ["id", "balance"],
      },
    ],
  });

  if (!account) {
    // @todo throw custom error
    throw new Error("not found");
  }

  return {
    success: true,
    data: account,
  };
};