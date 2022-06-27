import { createCustomer, createVA } from './paystackService';
import { createAccount } from './accountService';
import bcrypt from "bcryptjs";
import * as userDal from "../dal/user";
import * as accountDal from "../dal/account";
import * as virtualAccountsDal from "../dal/virtualAccounts";
import { GetAllUsersFilters } from "../dal/types";
import { UserInput, UserOutput } from "../models/User";
import { LoginAttributes } from "../../api/controllers/user";

export const create = async (payload: UserInput): Promise<UserOutput> => {
  const emailInput = payload.email;
  const emailExists = await userDal.checkEmailExists(payload.email);

  payload.email = emailExists ? payload.email : emailInput;

  // HASH PASSWORD
  const hashedPassword = bcrypt.hashSync(
    payload.password,
    bcrypt.genSaltSync(10)
  );
  payload.password = hashedPassword;

  // EMAIL EXIST?
  if (emailExists) {
    return {
      success: false,
      message: "Account already exists",
      data: {},
    };
  }

  const user = await userDal.create(payload);
  const userObj = user.data

  // Create Account Record - needs user.id
  if (user) {
    await createAccount({
      user_id: user.data.id || 0,
      balance: 1000000,
      UserId: user.data.id || 0,
    });

    const customerCreated = await createCustomer({
      email: String(userObj.email),
      first_name: String(userObj.firstName),
      last_name: String(userObj.lastName),
      phone: String(userObj.phone),
    })

    console.log("customerCreated");
    console.log(customerCreated.data.data);
    console.log("customerCreated");
    const  customerCreatedObj = customerCreated.data.data
      // Create VA - user.id
      const customerVaCreated = await createVA({
        customer: customerCreatedObj.customer_code
      })

      console.log("customerVaCreated");
      console.log(customerVaCreated.data);
      console.log("customerVaCreated");

      // TODO i stoppped here


      // after getting this data call crreate va from va sevice

  }



  return user;
};

export const login = async (payload: LoginAttributes): Promise<UserOutput> => {
  const emailInput = payload.email;
  const passwordInput = payload.password;

  const userExist = await userDal.getByEmail(emailInput);
  const dbPassword = userExist.data.password;
  // Check if password matches
  const isMatch = bcrypt.compareSync(passwordInput, dbPassword || "");

  if (!isMatch) {
    return {
      success: false,
      message: "Email/Password is incorrect",
      data: {},
    };
  }

  return {
    success: true,
    message: "Login Successful",
    data: userExist.data,
  };
};

export const update = async (
  id: number,
  payload: Partial<UserInput>
): Promise<UserOutput> => {
  if (payload.email) {
    const emailInput = payload.email;

    const emailExists = await userDal.checkEmailExists(payload.email);

    if (!emailExists) {
      return {
        success: false,
        message: "User is invalid",
        data: {},
      };
    }
  }

  return userDal.update(id, payload);
};

export const getById = (id: number): Promise<UserOutput> => {
  return userDal.getById(id);
};

export const deleteById = (id: number): Promise<boolean> => {
  return userDal.deleteById(id);
};
