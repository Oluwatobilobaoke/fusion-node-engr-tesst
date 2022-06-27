import { isEmpty } from "lodash";

import { Op } from 'sequelize'
import { Beneficiary, User } from "../models";
import { BeneficiaryInput, BeneficiaryOutput } from "../models/Beneficiary";
import { GetAllBeneficiaryFilters } from './types'

export const create = async (payload: BeneficiaryInput): Promise<BeneficiaryOutput> => {
  const beneficiary = await Beneficiary.create(payload)

  return {
    success: true,
    message: "Beneficiary added successfully",
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

// export const getAll = async (id: number, filters: GetAllBeneficiaryFilters): Promise<BeneficiaryOutput> => {
//   const beneficiaries = await Beneficiary.findAll({
//       where: {
//         user_id: id,
//           ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
//       },
//       ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
//   })

//   return {
//     success: true,
//     data: beneficiaries
//   }
// }

export const checkUserIsBeneficiary =async (id:number, email: string): Promise<boolean> => {
  const checkBeneficiary = await Beneficiary.findOne({
    where: {
      user_id: id,
      email,
    },
  });

  return !isEmpty(checkBeneficiary);
}


