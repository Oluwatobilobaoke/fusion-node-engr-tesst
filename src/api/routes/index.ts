import { Router } from "express";
import userRouter from "./user";
import beneficiaryRouter from "./beneficiary";
import accountRouter from "./account";
import cardRouter from "./card";

const router = Router();

router.use("/user", userRouter);
router.use("/beneficiary", beneficiaryRouter);
router.use("/account", accountRouter);
router.use("/card", cardRouter);

export default router;
