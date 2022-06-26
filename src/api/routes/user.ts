import { Router, Request, Response } from "express";
import { UserInput } from "../../db/models/User";

import * as userController from "../controllers/user";

const userRouter = Router();

userRouter.post("/register", async (req: Request, res: Response) => {
  const payload: UserInput = req.body;

  const result = await userController.createUser(payload);
  return res.status(200).send(result);
});

userRouter.post("/login", async (req: Request, res: Response) => {
  const payload: userController.LoginAttributes = req.body;

  const result = await userController.loginUser(payload);
  return res.status(200).send(result);
});

export default userRouter;
