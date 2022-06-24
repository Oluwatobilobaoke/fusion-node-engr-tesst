import { DataTypes, Model, ModelStatic, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import User from './User'

interface VirtualAccountAttributes {
  id: number
  email: string,
  bank_name: string,
  bank_slug: string,
  bank_id: string,
  active: boolean
  account_name: string,
  account_number: string,
  customer_code: string,
  domain: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date 
}


export interface VirtualAccountInput extends Optional<VirtualAccountAttributes, 'id' > {}

export interface VirtualAccountOutput extends Required<VirtualAccountAttributes> {}


class VirtualAccount extends Model<VirtualAccountAttributes, VirtualAccountInput> implements VirtualAccountAttributes {
  public id!: number
  public email!: string
  public bank_name!: string
  public bank_slug!: string
  public bank_id!: string
  public active!: boolean
  public account_name!: string
  public account_number!: string
  public customer_code!: string
  public domain!: string
  
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

VirtualAccount.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bank_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bank_slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bank_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    account_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    account_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customer_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.BOOLEAN,
      allowNull: false
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
  sequelize: sequelizeConnection,
})

VirtualAccount.belongsTo(User,{
  foreignKey: "id",
  as: "virtualaccounts"
})

User.hasMany(VirtualAccount, {
  as: "virtualaccounts"
})

export default VirtualAccount