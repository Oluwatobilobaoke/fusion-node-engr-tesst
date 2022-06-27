import * as virtualAccountDal from "../dal/virtualAccounts";
import {
  VirtualAccountInput,
  VirtualAccountOutput,
} from "../models/VirtualAccount";



const PAYSTACK_BASE_URL = 'https://api.paystack.co';
export const createVA = async (
  payload: VirtualAccountInput
): Promise<VirtualAccountOutput> => {
  return virtualAccountDal.create(payload);
};

export const getVaByUserId =async (id: number): Promise<VirtualAccountOutput> => {
  return virtualAccountDal.getByUserId(id)
}

export const getVaByEmail =async (email: string): Promise<VirtualAccountOutput> => {
  return virtualAccountDal.getByEmail(email)
}
