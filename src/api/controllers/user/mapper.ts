import { UserOutput } from "../../../db/models/User";

export interface UserOptOutput extends UserOutput {}

export const toUser = (data: UserOutput): UserOptOutput => {
  const user = data.data;
  
  return {
    success: data.success,
    message: data.message,
    data: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      Account: user.Account,
      beneficiaries: user.beneficiaries,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    },
  };
};
