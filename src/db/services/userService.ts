import * as userDal from '../dal/user'
import { GetAllUsersFilters } from '../dal/types'
import { UserInput, UserOutput } from '../models/User'

export const create =async (payload: UserInput): Promise<UserOutput> => {

  // TODO
  const emailInput = payload.email
  const emailExists = await userDal.checkEmailExists(payload.email)

  payload.email = emailExists ? payload.email : emailInput
  // HASH PASSWORD

  return userDal.create(payload);
}


export const update =async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {

  if (payload.email) {
    const emailInput = payload.email

    const emailExists = await userDal.checkEmailExists(payload.email)

    payload.email = emailExists ? payload.email : emailInput

  }

  return userDal.update(id, payload)
}

export const getById = (id: number): Promise<UserOutput> => {
  return userDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
  return userDal.deleteById(id)
}