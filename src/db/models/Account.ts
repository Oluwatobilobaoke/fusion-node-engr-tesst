import { DataTypes, Model, ModelStatic, Optional } from "sequelize";
import sequelizeConnection from "../config";
import Transaction from "./Transaction";
import User from "./User";
import { Account as AccountInterface } from "./../../api/interfaces/account.interface";

interface AccountAttributes {
  id: number;
  user_id: number;
  UserId?: number;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface AccountInput extends Optional<AccountAttributes, "id"> {}

export interface AccountOutput {
  success: boolean;
  message?: string;
  data: AccountInterface;
}

class Account
  extends Model<AccountAttributes, AccountInput>
  implements AccountAttributes
{
  public id!: number;
  public user_id!: number;
  public balance!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(20, 4).UNSIGNED,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

Account.hasMany(Transaction, {
  as: "transactions",
});

Transaction.belongsTo(Account, {
  foreignKey: "account_id",
});

export default Account;
