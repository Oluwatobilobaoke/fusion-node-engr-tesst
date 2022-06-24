require('dotenv').config()

import { 
  User,
  Account,
  Beneficiary,
  CardTransaction,
  Transaction,
  VirtualAccount
 } from './models'

const isDev = process.env.NODE_ENV === 'development'
// const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () => Promise.all([
  User.sync({ alter: isDev }),
  Account.sync({ alter: isDev }),
  // Beneficiary.sync({ alter: isDev }),
  // CardTransaction.sync({ alter: isDev  }),
  // Transaction.sync({ alter: isDev }),
  // VirtualAccount.sync({ alter: isDev }),


  // User.sync({ alter: isDev || isTest }),
  // Account.sync({ alter: isDev || isTest }),
  // Beneficiary.sync({ alter: isDev || isTest }),
  // CardTransaction.sync({ alter: isDev || isTest }),
  // Transaction.sync({ alter: isDev || isTest }),
  // VirtualAccount.sync({ alter: isDev || isTest }),
])

export default dbInit 
