import { Router, Request, Response } from "express";


import * as AccountController from "../controllers/account";


const accountRouter = Router();

accountRouter.post("/transfer", async (req: Request, res: Response) => {
  const payload: AccountController.TransferAttributes = req.body;

  const result = await AccountController.transferMoney(payload);
  return res.status(200).send(result);
})


accountRouter.get("/acc-deet/:id",async (req: Request, res: Response) => {
  const  { id }= req.params;

  const newId = Number(id);

  const { isUserId } = req.query;
  if (isUserId === "true") { 
    const result = await AccountController.getUserAccount({id: newId, isUserId: true});
    return res.status(200).send(result);
  }
  const result = await AccountController.getUserAccount({id: newId, isUserId: false});
  return res.status(200).send(result);
})

export default accountRouter;