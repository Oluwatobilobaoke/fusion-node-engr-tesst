import { AccountOptOutput } from '../../../src/api/controllers/account/mapper';
import { BeneficiaryOptOutput } from '../../../src/api/controllers/beneficiary/mapper';
import { UserOptOutput } from '../../../src/api/controllers/user/mapper';


import { request } from "../../helpers"


describe('***Routes****', () => {
  let user: UserOptOutput

      describe('Invalid Login User', () => {
        it('should return error is user login details is incorrect', async () => {
            const {body: data} = await request.post('/api/v1/user/login')
            .send({
              email: "ibrahiim@yopmail.com",
              password: "Qwerty112"
            }).expect(200)
            expect(data?.success).toEqual(false)
            expect(data?.message).toEqual('Account does not exist')
        })
      })

      describe('Create a User', () => {
        it('should register a user', async () => {
            const {body: data} = await request.post('/api/v1/user/register')
            .send({
              firstName: "YDM",
              lastName: "Sarah",
              phone: "09012345789",
              email: "ydmsarah@yopmail.com",
              password: "Qwerty112"
            }).expect(200)
            expect(data?.success).toEqual(true)
        })
      })
      describe('Create second User', () => {
        it('should register a user', async () => {
            const {body: data} = await request.post('/api/v1/user/register')
            .send({
              firstName: "Ade",
              lastName: "bade",
              phone: "09012122122",
              email: "adebade@yopmail.com",
              password: "Qwerty112"
            }).expect(200)
            expect(data?.success).toEqual(true)
        })
      })
      describe('Create third User', () => {
        it('should register a user', async () => {
            const {body: data} = await request.post('/api/v1/user/register')
            .send({
              firstName: "Ibra",
              lastName: "Hiim",
              phone: "09013920152",
              email: "ibrahiim@yopmail.com",
              password: "Qwerty112"
            }).expect(200)
            expect(data?.success).toEqual(true)
        })
      })


      describe('Login a User', () => {
        it('should return User Info is user login details is correct', async () => {
            const {body: data} = await request.post('/api/v1/user/login')
            .send({
              email: "ibrahiim@yopmail.com",
              password: "Qwerty112"
            }).expect(200)
            expect(data?.success).toEqual(true)
        })
      })



  let beneficary: BeneficiaryOptOutput

      describe('Add User Beneficiary', () => {
        it('should return success is user beneficary was successfully added ', async () => {
            const {body: data} = await request.post('/api/v1/beneficiary/create')
            .send({
              "user_id": 1,
              "email": "adebade@yopmail.com"          
            }).expect(200)
            expect(data?.success).toEqual(true)
            expect(data?.message).toEqual('Beneficiary added successfully')
        })
      })

      describe('Add User Beneficiary', () => {
        it('should return success is user beneficary was successfully added ', async () => {
            const {body: data} = await request.post('/api/v1/beneficiary/create')
            .send({
              "user_id": 2,
              "email": "ydmsarah@yopmail.com"          
            }).expect(200)
            expect(data?.success).toEqual(true)
            expect(data?.message).toEqual('Beneficiary added successfully')
        })
      })
      describe('Add User Beneficiary', () => {
        it('should return success is user beneficary was successfully added ', async () => {
            const {body: data} = await request.post('/api/v1/beneficiary/create')
            .send({
              "user_id": 2,
              "email": "ibrahiim@yopmail.com"          
            }).expect(200)
            expect(data?.success).toEqual(true)
            expect(data?.message).toEqual('Beneficiary added successfully')
        })
      })
      describe('Add User Beneficiary', () => {
        it('should return success is user beneficary was successfully added ', async () => {
            const {body: data} = await request.post('/api/v1/beneficiary/create')
            .send({
              "user_id": 3,
              "email": "ydmsarah@yopmail.com"          
            }).expect(200)
            expect(data?.success).toEqual(true)
            expect(data?.message).toEqual('Beneficiary added successfully')
        })
      })
      describe('Add User Beneficiary', () => {
        it('should return success is user beneficary was successfully added ', async () => {
            const {body: data} = await request.post('/api/v1/beneficiary/create')
            .send({
              "user_id": 3,
              "email": "adebade@yopmail.com"          
            }).expect(200)
            expect(data?.success).toEqual(true)
            expect(data?.message).toEqual('Beneficiary added successfully')
        })
      })

      let account: AccountOptOutput;

  describe("Transfer to Another Account", () => {
    it("should return a successful message upon transferring money successfully", async () => {
      const { body: data } = await request
        .post("/api/v1/account/transfer")
        .send({
          sender_id: 1,
          recipient_id: "adebade@yopmail.com",
          amount: 200000
        })
        .expect(200);
      expect(data?.success).toEqual(true);
      expect(data?.message).toEqual("transfer successful");
    });
  });

  describe("Transfer to Another Account", () => {
    it("should return a successful message upon transferring money successfully", async () => {
      const { body: data } = await request
        .post("/api/v1/account/transfer")
        .send({
          sender_id: 3,
          recipient_id: "adebade@yopmail.com",
          amount: 200000
        })
        .expect(200);
      expect(data?.success).toEqual(true);
      expect(data?.message).toEqual("transfer successful");
    });
  });

  describe("Transfer to Another Account that is not a User Beneficiary", () => {
    it("should return a error message because user is not a beneficiary", async () => {
      const { body: data } = await request
        .post("/api/v1/account/transfer")
        .send({
          sender_id: 1,
          recipient_id: "ibrahiim@yopmail.com",
          amount: 300000
        })
        .expect(200);
      expect(data?.success).toEqual(false);
      expect(data?.message).toEqual("Recipient must be your beneficiary before you can transfer money");
    });
  });
  describe("Transfer to Another Account With Less funds", () => {
    it("should return a error message because user is trying to transfer more than his/her wallet balance", async () => {
      const { body: data } = await request
        .post("/api/v1/account/transfer")
        .send({
          sender_id: 1,
          recipient_id: "adebade@yopmail.com",
          amount: 2000000000
        })
        .expect(200);
      expect(data?.success).toEqual(false);
      expect(data?.message).toEqual("Insufficient funds, Alaye Fund your account");
    });
  });
  describe("Transfer to Another Account ", () => {
    it("should return a error message because user  or recipient does not exist", async () => {
      const { body: data } = await request
        .post("/api/v1/account/transfer")
        .send({
          sender_id: 1111,
          recipient_id: "adebggde@yopmail.com",
          amount: 300000
        })
        .expect(200);
      expect(data?.success).toEqual(false);
      expect(data?.message).toEqual("User or Recipient Does not exist");
    });
  });

  // describe("deposit to Account", () => {
  //   it("should return a checkout link to proceed to deposit via Card or Bank Transfer", async () => {
  //     const { body: data } = await request
  //       .post("/api/v1/account/deposit")
  //       .send({
  //         currency: "NGN",
  //         amount: "2",
  //         fullname: "YDM Inc",
  //         email: "flutter-test@yopmail.com",
  //         account_id: 1,
  //         redirect_url: "https://3ee2-102-89-32-179.eu.ngrok.io/",
  //       })
  //       .expect(200);
  //     expect(data?.success).toEqual(true);
  //     expect(data?.message).toEqual("Hosted Link");
  //     expect(data?.data?.link).toContain("https://checkout.flutterwave.com/v3");
  //   });
  // });

  // describe("verify a deposit to account", () => {
  //   it("should return failed transaction", async () => {
  //     const { body: data } = await request
  //       .post("/api/v1/account/verify-payment")
  //       .send({
  //         status: "successful",
  //         tx_ref: "Txn-ydm-1656425051225",
  //         transaction_id: "656105532",
  //       })
  //       .expect(200);
  //     expect(data?.success).toEqual(false);
  //   });
  // });

  
  describe("Get a user account with account id", () => {
    it("should return user account info", async () => {
      const { body: data } = await request.get('/api/v1/account/acc-deet/1')
        .expect(200);
      expect(data?.success).toEqual(true);
    });
  });



  describe("Get a user account with user id", () => {
    it("should return user account info", async () => {
      const { body: data } = await request.get('/api/v1/account/acc-deet/1?isUserId=true')
        .expect(200);
      expect(data?.success).toEqual(true);
    });
  });


})

