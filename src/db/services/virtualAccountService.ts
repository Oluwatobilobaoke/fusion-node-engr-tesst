import * as virtualAccountDal from "../dal/virtualAccounts";
import {
  VirtualAccountInput,
  VirtualAccountOutput,
} from "../models/VirtualAccount";

export const createVA = async (
  payload: VirtualAccountInput
): Promise<VirtualAccountOutput> => {
  // Send request to Paystack here to create a new virtual account, save response in VA table

  return virtualAccountDal.create(payload);
};

export const getVaByUserId =async (id: number): Promise<VirtualAccountOutput> => {
  return virtualAccountDal.getByUserId(id)
}

export const getVaByEmail =async (email: string): Promise<VirtualAccountOutput> => {
  return virtualAccountDal.getByEmail(email)
}
