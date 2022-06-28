import { AccountOptOutput } from "./../../../src/api/controllers/account/mapper";
import { Account } from "../../../src/db/models";
import * as service from "../../../src/db/services/accountService";

import { request } from "../../helpers";

describe("Account Routes", () => {
  let account: AccountOptOutput;

  describe("deposit to Account", () => {
    it("should return a checkout link to proceed to deposit via Card or Bank Transfer", async () => {
      const { body: data } = await request
        .post("/api/v1/account/deposit")
        .send({
          currency: "NGN",
          amount: "2",
          fullname: "YDM Inc",
          email: "flutter-test@yopmail.com",
          account_id: 1,
          redirect_url: "https://3ee2-102-89-32-179.eu.ngrok.io/",
        })
        .expect(200);
      expect(data?.success).toEqual(true);
      expect(data?.message).toEqual("Hosted Link");
      expect(data?.data?.link).toContain("https://checkout.flutterwave.com/v3");
    });
  });

  describe("verify a deposit to account", () => {
    it("should return failed transaction", async () => {
      const { body: data } = await request
        .post("/api/v1/account/verify-payment")
        .send({
          status: "successful",
          tx_ref: "Txn-ydm-1656425051225",
          transaction_id: "656105532",
        })
        .expect(200);
      expect(data?.success).toEqual(false);
      expect(data?.message).toEqual("Transaction Failed");
    });
  });
});
