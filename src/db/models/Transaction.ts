import { DataTypes, Model, ModelStatic, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Account from './Account'


enum Txn_Type {
  "debit",
  "credit"
}

enum Purpose {
  "deposit",
  "transfer",
  "reversal"
}

interface TransactionMetadata {
  info: string | null
}

interface TransactionAttributes {
  id: number
  txn_type: Txn_Type
  purpose: Purpose
  amount: number
  account_id: number
  reference: string
  balance_before: number
  balance_after: number
  metadata: TransactionMetadata | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface TransactionInput extends Optional<TransactionAttributes, 'id' > {}

export interface TransactionOutput extends Required<TransactionAttributes> {}

class Transaction extends Model<TransactionAttributes, TransactionInput> implements TransactionAttributes {
    public id!: number
    public txn_type!: Txn_Type
    public purpose!: Purpose
    public amount!: number
    public account_id!: number
    public reference!: string
    public balance_before!: number
    public balance_after!: number
    public metadata!: TransactionMetadata | null

    
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Transaction.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    txn_type: {
      type: DataTypes.ENUM("debit", "credit"),
      allowNull: false
    },
    purpose: {
      type: DataTypes.ENUM('deposit', 'transfer', 'reversal'),
      allowNull: false    
    },
    amount: {
      type: DataTypes.DECIMAL(20, 4).UNSIGNED,
      allowNull: false,
    },
    account_id:{
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    reference: {
      type: DataTypes.STRING,
      unique: "reference"
    },
    balance_before: {
      type: DataTypes.DECIMAL(20, 4).UNSIGNED,
      allowNull: false,
    },
    balance_after: {
      type: DataTypes.DECIMAL(20, 4).UNSIGNED,
      allowNull: false,
    },
    metadata:{
      type: DataTypes.JSON,
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
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
})



export default Transaction