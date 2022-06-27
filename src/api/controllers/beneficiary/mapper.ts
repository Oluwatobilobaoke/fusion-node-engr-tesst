import { BeneficiaryOutput } from "../../../db/models/Beneficiary";

export interface BeneficiaryOptOutput extends BeneficiaryOutput {}

export const toBeneficiary = (data: BeneficiaryOutput): BeneficiaryOptOutput => {
  const beneficiary = data.data;

  return {
    success: data.success,
    message: data.message,
    data: {
      id: beneficiary.id,
      user_id: beneficiary.user_id,
      email: beneficiary.email,
      createdAt: beneficiary.createdAt,
      updatedAt: beneficiary.updatedAt,
      deletedAt: beneficiary.deletedAt,
    },
  };
};

