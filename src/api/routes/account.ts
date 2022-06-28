import { Router, Request, Response } from "express";

import * as AccountController from "../controllers/account";

const accountRouter = Router();

accountRouter.post("/transfer", async (req: Request, res: Response) => {
  const payload: AccountController.TransferAttributes = req.body;

  const result = await AccountController.transferMoney(payload);
  return res.status(200).send(result);
});

accountRouter.get("/acc-deet/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const newId = Number(id);

  const { isUserId } = req.query;
  if (isUserId === "true") {
    const result = await AccountController.getUserAccount({
      id: newId,
      isUserId: true,
    });
    return res.status(200).send(result);
  }
  const result = await AccountController.getUserAccount({
    id: newId,
    isUserId: false,
  });
  return res.status(200).send(result);
});

accountRouter.post("/deposit", async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await AccountController.paymentLink(payload);
  return res.status(200).send(result);
});

accountRouter.get("/verify-payment", async (req: Request, res: Response) => {
  const { status, tx_ref, transaction_id } = req.query;

  const payload = {
    status: String(status),
    tx_ref: String(tx_ref),
    transaction_id: String(transaction_id),
  };

  const result = await AccountController.verifyPayment(payload);
  return res.status(200).send(result);
});

accountRouter.post("/webhook", async (req: Request, res: Response) => {
  console.log(req);

  const hash = req.headers["verif-hash"];
  const body = req.body;

  const payload = {
    headerHash: hash,
    body,
  };

  const result = await AccountController.WebHook(payload);
  return res.status(200).send(result);
});

export default accountRouter;
