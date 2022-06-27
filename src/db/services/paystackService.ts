require('dotenv').config()
import axios from "axios";

const PAYSTACK_BASE_URL = 'https://api.paystack.co';

export interface createCustomerAttributes {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface createCustomerVA {
  customer: string;
}



export const createCustomer = async (payload: createCustomerAttributes) => {
  const customer = await axios.post(`${PAYSTACK_BASE_URL}/customer`, {
    email: payload.email,
    first_name: payload.first_name,
    last_name: payload.last_name,
    phone: payload.last_name,

  }, {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  return customer
}

export const createVA = async (payload: createCustomerVA) => {
  const customerVa =  await axios.post(`${PAYSTACK_BASE_URL}/dedicated_account`,{
    customer: payload.customer,
    preferred_bank: "test-bank"
  }, {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  })

  return customerVa
}
