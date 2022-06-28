import * as service from "../../../db/services/flutterwaveService";

export const chargeCard = async (
  payload: service.payloadToEncrypt,
  res: any
) => {
  return await service.chargeCard(payload, res);
};

export const authorizeCharge = async (req: any, res: any) => {
  return await service.authorizeCharge(req, res);
};

export const validateCharge = async (req: any, res: any) => {
  return await service.validateCharge(req, res);
};
