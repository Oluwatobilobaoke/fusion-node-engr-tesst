import {isEmpty} from 'lodash'


import { User } from '../models'
import { UserInput, UserOutput } from '../models/User'


export const create = async (payload: UserInput): Promise<UserOutput> => {
    const user =  await User.create(payload)

    return user
}

export const findOrCreate = async (payload: UserInput): Promise<UserOutput> => {
  const [user] = await User.findOrCreate({
    where: {
      email: payload.email
    },
    defaults: payload
  })
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
  const user = await User.findByPk(id)

  if (!user) {
      // @todo throw custom error
      throw new Error('not found')
  }

  const updatedUser = await user.update(payload)
  return updatedUser
}

export const getById = async (id: number): Promise<UserOutput> => {
  const user = await User.findByPk(id)

  if (!user) {
      // @todo throw custom error
      throw new Error('not found')
  }

  return user
}

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedUserCount = await User.destroy({
      where: {id}
  })

  return !!deletedUserCount
}

export const checkEmailExists = async (email: string): Promise<boolean> => {
  const userWithEmail = await User.findOne({
      where: {
          email
      }
  });

  return !isEmpty(userWithEmail)
}
export const checkPhoneExists = async (phone: string): Promise<boolean> => {
  const userWithPhone = await User.findOne({
      where: {
          phone
      }
  });

  return !isEmpty(userWithPhone)
}
