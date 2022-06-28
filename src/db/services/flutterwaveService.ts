require("dotenv").config();

import { create } from "./../dal/card";
import axios from "axios";
import { updateReference } from "../dal/card";
import { Response, Request } from "express";

const FLW_BASE_URL = process.env.FLW_BASE_URL;

// function processInitialCardCharge(chargeResult: any) {
//   if (chargeResult.data.status === 'success') {
//     return {
//       success: true,
//       status: chargeResult.data.status,
//       message: chargeResult.data.message,
//       data: {
//         shouldCreditAccount: true,
//         reference: chargeResult.data.reference,
//       },
//     };
//   }

//   return {
//     success: true,
//     status: chargeResult.data.status,
//     message: chargeResult.data.message,
//     data: {
//       shouldCreditAccount: false,
//       reference: chargeResult.data.reference,
//     },
//   };
// }

export interface payloadToEncrypt {
  card_number: string;
  cvv: string;
  expiry_month: string;
  expiry_year: string;
  currency: string;
  amount: string;
  email: string;
  fullname: string;
  tx_ref: string;
}

function encrypt(encryptionKey: any, payload: payloadToEncrypt) {
  const text = JSON.stringify(payload);
  const forge = require("node-forge");
  const cipher = forge.cipher.createCipher(
    "3DES-ECB",
    forge.util.createBuffer(encryptionKey)
  );
  cipher.start({ iv: "" });
  cipher.update(forge.util.createBuffer(text, "utf-8"));
  cipher.finish();
  const encrypted = cipher.output;
  return forge.util.encode64(encrypted.getBytes());
}

// Initiate payment
export const chargeCard = async (payload: payloadToEncrypt, res: Response) => {
  try {
    const encryptionObj = {
      card_number: payload.card_number,
      cvv: payload.cvv,
      expiry_month: payload.expiry_month,
      expiry_year: payload.expiry_year,
      currency: payload.currency,
      amount: payload.amount,
      email: payload.email,
      fullname: payload.fullname,
      tx_ref: "txn-ydm-" + Date.now(),
    };

    const { data } = await axios.post(
      `${FLW_BASE_URL}/charges?type=card`,
      encryptionObj,
      // {
      //   client: encrypt(process.env.FLW_ENC_KEY, encryptionObj),

      // },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );


    console.log(data);

    //  After charging card check for mode in response
    // switch (response?.meta?.authorization?.mode) {
    //   case "pin":
    //   case "avs_noauth":
    //     const charge_payload = payload;
    //     const auth_fields = response.meta.authorization.fields;
    //     const auth_mode = response.meta.authorization.mode;

    //     let options = {
    //       maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    //       httpOnly: true, // The cookie only accessible by the web server
    //       signed: true, // Indicates if the cookie should be signed
    //     };

    //     res.cookie("charge_payload", JSON.stringify(charge_payload), options);
    //     res.cookie("auth_fields", JSON.stringify(auth_fields), options);
    //     res.cookie("auth_mode", JSON.stringify(auth_mode), options);

    //     return {
    //       status: true,
    //       message: "Charge Initiated",
    //       data: {},
    //     };

    //     return;

    //   case "redirect":
    //     const authUrl = response.meta.authorization.redirect;
    //     return {
    //       status: true,
    //       message: "Charge Initiated",
    //       data: {
    //         id: response.id,
    //         authorization_url: authUrl,
    //       },
    //     };
    //     return;

    //   default:
    //     // No authorization needed; just verify the payment
    //     const transactionId = response.data.id;
    //     const transaction = await axios.get(
    //       `${FLW_BASE_URL}/transactions/${transactionId}/verify`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     if (transaction.data.status == "successful") {
    //       return {
    //         status: true,
    //         message: "Charge Initiated",
    //         data: {
    //           id: transaction.data.id,
    //           tx_ref: transaction.data.tx_ref,
    //           amount: transaction.data.amount,
    //         },
    //       };
    //     } else {
    //       return {
    //         status: false,
    //         message: "Charge failed",
    //         data: {},
    //       };
    //     }
    // }
  } catch (error: any) {
    return {
      status: false,
      message: error?.message,
      error,
    };
  }
};

export const authorizeCharge = async (req: Request, res: Response) => {
  const { charge_payload, auth_fields, auth_mode } = req.cookies;

  const payload = JSON.parse(charge_payload);

  payload.authorization = {
    mode: JSON.parse(auth_mode),
  };

  const fields = JSON.parse(auth_fields);
  fields.forEach((field: any) => {
    payload.authorization.field = req.body[field];
  });

  const cardCharge = await axios.post(
    `${FLW_BASE_URL}/charges?type=card`,
    {
      client: encrypt(process.env.FLW_ENC_KEY, payload),
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const response = await cardCharge.data;

  //  After charging card check for mode in response
  switch (response?.meta?.authorization?.mode) {
    case "otp":
      const flw_ref = response.data.flw_ref;

      let options = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: true, // Indicates if the cookie should be signed
      };

      res.cookie("flw_ref", flw_ref, options);

      return {
        status: true,
        message: "Authorizing Charge",
        data: {},
      };

      return;

    case "redirect":
      const authUrl = response.meta.authorization.redirect;
      return {
        status: true,
        message: "Redirecting to authorization url",
        data: {
          authorization_url: authUrl,
        },
      };

    default:
      // No authorization needed; just verify the payment
      const transactionId = response.data.id;
      const transaction = await axios.get(
        `${FLW_BASE_URL}/transactions/${transactionId}/verify`,
        {
          headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (transaction.data.status == "successful") {
        return {
          status: true,
          message: "Charge successful",
          data: {
            id: transaction.data.id,
            tx_ref: transaction.data.tx_ref,
            amount: transaction.data.amount,
          },
        };
      } else {
        return {
          status: false,
          message: "Charge failed",
          data: {},
        };
      }
  }
};

export const validateCharge = async (req: Request, res: Response) => {
  const { flw_ref } = req.cookies;
  const { type, otp } = req.body;

  const validateCharge = await axios.post(
    `${FLW_BASE_URL}/validate-charge`,
    {
      type,
      flw_ref,
      otp,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const response = await validateCharge.data;

  const transactionId = response.data.id;
  const transaction = await axios.get(
    `${FLW_BASE_URL}/transactions/${transactionId}/verify`,
    {
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (transaction.data.status == "successful") {
    return {
      status: true,
      message: "Charge validated",
      data: {
        id: transaction.data.id,
        tx_ref: transaction.data.tx_ref,
        amount: transaction.data.amount,
      },
    };
  } else {
    return {
      status: false,
      message: "Charge failed",
      data: {},
    };
  }
};
