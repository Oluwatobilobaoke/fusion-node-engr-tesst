import { UserOptOutput } from './../../../src/api/controllers/user/mapper';
import { User } from "../../../src/db/models";
import * as service from "../../../src/db/services/userService";


import { request } from "../../helpers"


const dbTeardown = async () => {
  await User.sequelize?.query("SET FOREIGN_KEY_CHECKS = 0")
  await User.destroy({ cascade: true, truncate: true, force: true });
  await User.sequelize?.query("SET FOREIGN_KEY_CHECKS = 1")
}

describe('User Routes', () => {
  let user: UserOptOutput

  // beforeAll(async () => {
  //   [user] = await Promise.all([
  //     service.create({
  //       firstName: "Ade",
  //       lastName: "bade",
  //       phone: "09012122122",
  //       email: "adebade@yopmail.com",
  //       password: "Qwerty112"
  //     }),
  //     service.create({
  //       firstName: "Tols",
  //       lastName: "Tola",
  //       phone: "09032122142",
  //       email: "tolsTola@yopmail.com",
  //       password: "Qwerty112"
  //     }),
  //     service.create({
  //       firstName: "Sarah",
  //       lastName: "Will",
  //       phone: "09014120122",
  //       email: "sarahwill@yopmail.com",
  //       password: "Qwerty112"
  //     }),
  //     service.create({
  //       firstName: "Ibra",
  //       lastName: "Hiim",
  //       phone: "09013920152",
  //       email: "ibrahiim@yopmail.com",
  //       password: "Qwerty112"
  //     }),

  //   ]);
  // })

      describe('Invalid Login User', () => {
        it('should return error is user login details is incorrect', async () => {
            const {body: data} = await request.post('/api/v1/user/login')
            .send({
              email: "ibrahiim@yopmail.com",
              password: "Qwerty112"
            }).expect(200)
            expect(data?.success).toEqual(false)
            expect(data?.message).toEqual('Account does not exist')
        })
      })

      describe('Create a User', () => {
        it('should return User Info is user login details is correct', async () => {
            const {body: data} = await request.post('/api/v1/user/register')
            .send({
              firstName: "YDM",
              lastName: "Sarah",
              phone: "09012345789",
              email: "ydmsarah@yopmail.com",
              password: "Qwerty112"
            }).expect(200)
            expect(data?.success).toEqual(true)
        })
      })


})

