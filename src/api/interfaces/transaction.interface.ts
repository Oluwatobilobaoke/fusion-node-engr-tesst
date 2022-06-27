export interface Transaction {
  id?: number
  txn_type?: Txn_Type
  purpose?: string
  amount?: number
  account_id?: number
  reference?: string
  balance_before?: number
  balance_after?: number
  metadata?: TransactionMetadata | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export enum Txn_Type {
  debit = "debit",
  credit = "credit"
}



export interface TransactionMetadata {
  info: string | null
}