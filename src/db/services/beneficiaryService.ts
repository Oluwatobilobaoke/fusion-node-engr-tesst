import * as userDal from "../dal/user";
import * as beneficiaryDal from "../dal/beneficiary";
import { BeneficiaryInput, BeneficiaryOutput } from "../models/Beneficiary";


export const create = async (
  payload: BeneficiaryInput
): Promise<BeneficiaryOutput> => {


  const userId = payload.user_id;
  const emailUser = payload.email;
  const payloadObj = {
    ...payload,
    UserId: userId
  }
  const beneficiaryExists = await beneficiaryDal.checkUserIsBeneficiary(userId, emailUser);

  if (beneficiaryExists) {
    return {
      success: false,
      message: "beneficiary already exists",
      data: {},
    };
  }

  const checkbeneficiaryIsAUser = await userDal.checkEmailExists(emailUser);

  if (!checkbeneficiaryIsAUser) {
    return {
      success: false,
      message: "sorry you can not add this user as beneficary, the user does not exist",
      data: {},
    };
  }
  return beneficiaryDal.create(payloadObj);
};

export const update =async (id: number, email: string, user_id: number): Promise<BeneficiaryOutput> => {

    const beneficiaryExists = await beneficiaryDal.checkUserIsBeneficiary(user_id, email);

    if (beneficiaryExists) {
      return {
        success: false,
        message: "beneficiary already exists",
        data: {},
      };
    }

    const payload = {
      id,
      email,
      user_id
    }

    return beneficiaryDal.update(id, payload)
}