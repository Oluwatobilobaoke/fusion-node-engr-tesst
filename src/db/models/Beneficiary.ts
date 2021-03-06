import { Beneficiary as BeneficiaryInterface } from './../../api/interfaces/beneficiary.interface';
import { DataTypes, Model, ModelStatic, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import User from './User'

interface BeneficiaryAttributes {
  id: number
  user_id: number
  email: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface BeneficiaryInput extends Optional<BeneficiaryAttributes, 'id' > {}
export interface BeneficiaryOutput {
  success: boolean;
  message?: string;
  data: BeneficiaryInterface;
}

class Beneficiary extends Model<BeneficiaryAttributes, BeneficiaryInput> implements BeneficiaryAttributes {
    public id!: number
    public user_id!: number
    public email!: string;
    
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Beneficiary.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
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

User.hasMany(Beneficiary, {
  as: "beneficiaries"
})

Beneficiary.belongsTo(User, {
  foreignKey: "user_id",
})

export default Beneficiary