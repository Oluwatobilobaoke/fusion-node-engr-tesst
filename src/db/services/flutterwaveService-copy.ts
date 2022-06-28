import { create } from './../dal/card';
import axios from 'axios';
import { updateReference } from '../dal/card';


require('dotenv').config()


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
  cvv: string,
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
  cipher.start({iv: ""});
  cipher.update(forge.util.createBuffer(text, "utf-8"));
  cipher.finish();
  const encrypted = cipher.output;
  return forge.util.encode64(encrypted.getBytes());
}

export const chargeCard = async (payload: payloadToEncrypt) => {

  const encryptionObj = {
    card_number: payload.card_number,
    cvv: payload.cvv,
    expiry_month: payload.expiry_month,
    expiry_year: payload.expiry_year,
    currency: payload.currency,
    amount: payload.amount,
    email: payload.email,
    fullname: payload.fullname,
    tx_ref: "Txn-ydm-" + Date.now(),
  }

  const cardCharge = await axios.post(`${FLW_BASE_URL}/charges?type=card`, {
    client: encrypt(process.env.FLW_ENC_KEY, encryptionObj)
  }, {
    headers: {
      Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
 });

 console.log("======card charge=========")
 console.log(cardCharge.data)
 console.log("======card charge=========")




//  return cardCharge

}
