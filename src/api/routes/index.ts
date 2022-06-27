import { Router } from "express";
import userRouter from "./user";
import beneficiaryRouter from "./beneficiary";

const router = Router();

router.use("/user", userRouter);
router.use("/beneficiary", beneficiaryRouter)

export default router;
