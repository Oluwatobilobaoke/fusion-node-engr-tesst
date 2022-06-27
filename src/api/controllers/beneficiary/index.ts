import * as service from "../../../db/services/beneficiaryService";
import * as mapper from "./mapper";
import { BeneficiaryInput } from "../../../db/models/Beneficiary";


export const createBeneficiary = async (
  payload: BeneficiaryInput
): Promise<mapper.BeneficiaryOptOutput> => {
  return mapper.toBeneficiary(await service.create(payload));
};

