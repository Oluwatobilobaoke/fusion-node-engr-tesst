import { Router, Request, Response } from "express";
import { payloadToEncrypt } from "../../db/services/flutterwaveService";

import * as cardController from "../controllers/card";

const cardRouter = Router();

cardRouter.post("/pay", async (req: Request, res: Response) => {
  const payload: payloadToEncrypt = req.body;

  const result = await cardController.chargeCard(payload, res);
  console.log(result);

  if (result?.error) {
    return res.status(result.error.response.status).json(result);
  }

  return res.status(200).send(result);
});

cardRouter.post("/pay/auhtorize", async (req: Request, res: Response) => {
  const result = await cardController.authorizeCharge(req, res);
  return res.status(200).send(result);
});

cardRouter.post("/pay/validate", async (req: Request, res: Response) => {
  const result = await cardController.validateCharge(req, res);
  return res.status(200).send(result);
});

export default cardRouter;
