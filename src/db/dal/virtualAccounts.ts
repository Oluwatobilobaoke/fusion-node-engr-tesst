import { VirtualAccount } from "../models";
import {
  VirtualAccountInput,
  VirtualAccountOutput,
} from "../models/VirtualAccount";

export const create = async (
  payload: VirtualAccountInput
): Promise<VirtualAccountOutput> => {
  const virtualAccount = await VirtualAccount.create(payload);

  return {
    success: true,
    data: virtualAccount,
  };
};

export const getById =async (id: number): Promise<VirtualAccountOutput> => {
  const vaccount = await VirtualAccount.findByPk(id)

  if (!vaccount) {
    return {
      success: false,
      message: "Account does not exist",
      data: {}
    }
  }

  return {
    success: true,
    data: vaccount
  }
}


export const getByEmail =async (email: string): Promise<VirtualAccountOutput> => {
  const vaccount = await VirtualAccount.findOne({
    where: {
      email,
    },
  });

  if (!vaccount) {
    return {
      success: false,
      message: "Account does not exist",
      data: {}
    }
  }

  return {
    success: true,
    data: vaccount
  }
}


export const getByUserId =async (id: number): Promise<VirtualAccountOutput> => {
  const vaccount = await VirtualAccount.findOne({
    where: {
      user_id: id,
    },
  });

  if (!vaccount) {
    return {
      success: false,
      message: "Account does not exist",
      data: {}
    }
  }

  return {
    success: true,
    data: vaccount
  }
}