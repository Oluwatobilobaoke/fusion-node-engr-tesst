import { isEmpty } from "lodash";

import { Account, Beneficiary, User } from "../models";
import { UserInput, UserOutput } from "../models/User";

export const create = async (payload: UserInput): Promise<UserOutput> => {
  const user = await User.create(payload);

  return {
    success: true,
    data: user,
  };
};

export const findOrCreate = async (payload: UserInput): Promise<UserOutput> => {
  const [user] = await User.findOrCreate({
    where: {
      email: payload.email,
    },
    defaults: payload,
  });

  return {
    success: true,
    data: user,
  };
};

export const update = async (
  id: number,
  payload: Partial<UserInput>
): Promise<UserOutput> => {
  const user = await User.findByPk(id);

  if (!user) {
    return {
      success: false,
      message: "Account does not exist",
      data: {}
    }
  }

  const updatedUser = await user.update(payload);
  return {
    success: true,
    data: updatedUser,
  };
};

export const getById = async (id: number): Promise<UserOutput> => {
  const user = await User.findByPk(id);

    if (!user) {
      return {
        success: false,
        message: "Account does not exist",
        data: {}
      }
    }

  return {
    success: true,
    data: user,
  };
};

export const getByEmail = async (email: string): Promise<UserOutput> => {
  const user = await User.findOne({
    where: { email: email },
    include: [
      {
        model: Account,
        attributes: ["id", "balance"],
      },
      {
        model: Beneficiary,
        attributes: ["id", "email"],
        as: "beneficiaries"
      }
    ],
  });


  if (!user) {
    return {
      success: false,
      message: "Account does not exist",
      data: {}
    }
  }


  return {
    success: true,
    data: user,
  };
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedUserCount = await User.destroy({
    where: { id },
  });

  return !!deletedUserCount;
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  const userWithEmail = await User.findOne({
    where: {
      email,
    },
  });

  return !isEmpty(userWithEmail);
};
export const checkPhoneExists = async (phone: string): Promise<boolean> => {
  const userWithPhone = await User.findOne({
    where: {
      phone,
    },
  });

  return !isEmpty(userWithPhone);
};
