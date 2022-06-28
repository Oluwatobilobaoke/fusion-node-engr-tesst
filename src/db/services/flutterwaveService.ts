require("dotenv").config();

import { create } from "./../dal/card";
import axios from "axios";
import { updateReference } from "../dal/card";
import * as transactionDal from "../dal/transaction";
import * as accountDal from "../dal/account";
import { creditAccount } from "./transactionService";
import { Txn_Type } from "../../api/interfaces";
import sequelizeConnection from "../config";
import _ from "lodash";

const FLW_BASE_URL = process.env.FLW_BASE_URL;

export interface Payload {
  account_id: number;
  fullname: string;
  currency: string;
  amount: string;
  email: string;
  tx_ref?: string;
  redirect_url?: string;
}

export interface VerifyPayload {
  status: string;
  tx_ref: string;
  transaction_id: string;
}

// payments
export const generatePaymentLink = async (payload: Payload) => {
  try {
    const paymentObject = {
      currency: payload.currency,
      amount: payload.amount,
      email: payload.email,
      redirect_url: payload.redirect_url,
      tx_ref: "Txn-ydm-" + Date.now(),
      customer: {
        email: payload.email,
        name: payload.fullname,
        phone_number: payload.account_id,
      },
      meta: {
        account_id: payload.account_id,
      },
    };

    const { data } = await axios.post(
      `${FLW_BASE_URL}/payments`,
      paymentObject,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (data.status === "success") {
      return {
        status: true,
        message: data.message,
        data: data.data,
      };
    }
    return {
      status: false,
      message: "Something went wrong",
      data: {},
    };
  } catch (error) {
    console.log(error);
  }
};

// payment verification
export const verifyPayment = async (payload: VerifyPayload) => {
  try {
    const { tx_ref, transaction_id, status } = payload;
    if (status === "successful") {
      const transactionDetails = await transactionDal.getByRef(tx_ref);

      const { data } = await axios.get(
        `${FLW_BASE_URL}/transactions/${transaction_id}/verify`,
        {
          headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const id = Number(data.data.meta.account_id);

      const t = await sequelizeConnection.transaction();

      if (data.data.status === "successful") {
        // Success! Confirm the customer's payment
        await creditAccount(
          {
            amount: data.data.amount_settled,
            account_id: Number(id),
            txn_type: Txn_Type.credit,
            purpose: "deposit",
            reference: tx_ref,
            metadata: { info: JSON.stringify(data) },
          },
          t
        );

        return {
          status: true,
          message: `Transfer successful`,
          data: {
            tx_ref: data.data.tx_ref,
            flw_ref: data.data.flw_ref,
          },
        };
      } else {
        // Inform the customer their payment was unsuccessful
        const accData = await accountDal.getById(id);

        transactionDal.create({
          txn_type: Txn_Type.credit,
          purpose: "deposit",
          amount: Number(transactionDetails.data.amount),
          account_id: Number(id),
          reference: tx_ref,
          metadata: { info: "Transaction Failed" },
          balance_before: Number(accData.data.balance),
          balance_after: Number(accData.data.balance),
        });

        return {
          status: false,
          message: "Transaction Failed",
        };
      }
    }
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
      data: error,
    };
  }
};

// WebHook

export const webhook = async (payload: any) => {
  try {
    const myHash = process.env.MY_HASH;
    const { headerHash, body } = payload;

    if (!headerHash) return;
    if (headerHash !== myHash) return;

    const id = Number(body.data.customer.phone_number);
    const t = await sequelizeConnection.transaction();

    switch (body.event) {
      case "charge.completed":
        await creditAccount(
          {
            amount: body.data.amount,
            account_id: Number(id),
            txn_type: Txn_Type.credit,
            purpose: "deposit",
            reference: body.data.tx_ref,
            metadata: { info: JSON.stringify(body) },
          },
          t
        );
        return;

      default:
        const accData = await accountDal.getById(id);

        transactionDal.create({
          txn_type: Txn_Type.credit,
          purpose: "deposit",
          amount: Number(body.data.amount),
          account_id: Number(id),
          reference: body.data.reference,
          metadata: { info: JSON.stringify(body) },
          balance_before: Number(accData.data.balance),
          balance_after: Number(accData.data.balance),
        });

        return;
    }
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
      data: error,
    };
  }
};
