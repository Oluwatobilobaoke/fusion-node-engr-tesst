export interface VirtualAccount {
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
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date 
}