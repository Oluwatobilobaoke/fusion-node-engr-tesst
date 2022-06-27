import { BeneficiaryInput } from './../../db/models/Beneficiary';
import { Router, Request, Response } from "express";

import * as beneficiaryController from "../controllers/beneficiary";

const beneficiaryRouter = Router();

beneficiaryRouter.post("/create",async (req:Request, res: Response) => {
  const payload: BeneficiaryInput = req.body;

  const result = await beneficiaryController.createBeneficiary(payload)
  return res.status(200).send(result)
})

export default beneficiaryRouter;