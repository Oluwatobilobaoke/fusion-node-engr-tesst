import { Router } from "express";
import userRouter from "./user";
import beneficiaryRouter from "./beneficiary";
import accountRouter from "./account";

const router = Router();

router.use("/user", userRouter);
router.use("/beneficiary", beneficiaryRouter)
router.use("/account", accountRouter)

export default router;
