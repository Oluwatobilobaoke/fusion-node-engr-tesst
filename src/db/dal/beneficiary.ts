import { Beneficiary, User } from "../models";
import { BeneficiaryInput, BeneficiaryOutput } from "../models/Beneficiary";

export const create = async (payload: BeneficiaryInput): Promise<BeneficiaryOutput> => {
  const beneficiary = await Beneficiary.create(payload)

  return {
    success: true,
    data: beneficiary
  };
}

export const update = async (
  id: number,
  payload: Partial<BeneficiaryInput>
): Promise<BeneficiaryOutput> => {
  const beneficiary = await Beneficiary.findByPk(id);

  if (!beneficiary) {
    return {
      success: false,
      message: "Beneficiary does not exist",
      data: {}
    }
  }

  const updatedBeneficiary = await beneficiary.update(payload);
  return {
    success: true,
    data: updatedBeneficiary,
  };
};