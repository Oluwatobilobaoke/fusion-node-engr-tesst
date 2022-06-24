import { DataTypes, Model, ModelStatic, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface CardTransactionAttributes {
  id: number
  external_reference?: string
  account_id: number
  amount: number
  last_response?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}


export interface CardTransactionInput extends Optional<CardTransactionAttributes, 'id'| 'external_reference' | 'last_response' > {}

export interface CardTransactionOutput extends Required<CardTransactionAttributes> {}

class CardTransaction extends Model<CardTransactionAttributes, CardTransactionInput> implements CardTransactionAttributes {
    public id!: number
    public external_reference!: string
    public account_id!: number
    public amount!: number
    public last_response!: string

    
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

CardTransaction.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    external_reference: {
      type: DataTypes.STRING,
      unique: true
    },
    account_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true
    },
    amount: {
        type: DataTypes.DECIMAL(20, 4).UNSIGNED,
        allowNull: false
    },
    last_response: {
      type: DataTypes.STRING,
      unique: true
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
  sequelize: sequelizeConnection
})


export default CardTransaction