import { DataTypes, Model, ModelStatic, Optional } from "sequelize";
import sequelizeConnection from "../config";
import { Transaction as TransactionInterface } from "../../api/interfaces";

enum Txn_Type {
  debit = "debit",
  credit = "credit",
}

// export enum Purpose {
//   depoist = "deposit",
//   transfer = "transfer",
//   reversal = "reversal"
// }

interface TransactionMetadata {
  info: string | null;
}

interface TransactionAttributes {
  id: number;
  txn_type?: Txn_Type;
  purpose?: string;
  amount: number;
  account_id: number;
  reference: string;
  balance_before?: number;
  balance_after?: number;
  metadata: TransactionMetadata | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface TransactionInput
  extends Optional<TransactionAttributes, "id"> {}

export interface TransactionOutput {
  success: boolean;
  message?: string;
  data: TransactionInterface;
}

class Transaction
  extends Model<TransactionAttributes, TransactionInput>
  implements TransactionAttributes
{
  public id!: number;
  public txn_type!: Txn_Type;
  public purpose!: string;
  public amount!: number;
  public account_id!: number;
  public reference!: string;
  public balance_before!: number;
  public balance_after!: number;
  public metadata!: TransactionMetadata | null;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    txn_type: {
      type: DataTypes.ENUM("debit", "credit"),
      allowNull: false,
    },
    purpose: {
      type: DataTypes.ENUM("deposit", "transfer", "reversal"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(20, 4).UNSIGNED,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
    },
    balance_before: {
      type: DataTypes.DECIMAL(20, 4).UNSIGNED,
      allowNull: false,
    },
    balance_after: {
      type: DataTypes.DECIMAL(20, 4).UNSIGNED,
      allowNull: false,
    },
    metadata: {
      type: DataTypes.STRING,
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

export default Transaction;
