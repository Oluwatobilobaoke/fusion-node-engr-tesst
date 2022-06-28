import { UserOptOutput } from './../../../src/api/controllers/user/mapper';
import { User } from "../../../src/db/models";


import { request } from "../../helpers"


describe('User Routes', () => {
  let user: UserOptOutput

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
      describe('Create second User', () => {
        it('should return User Info is user login details is correct', async () => {
            const {body: data} = await request.post('/api/v1/user/register')
            .send({
              firstName: "Ade",
              lastName: "bade",
              phone: "09012122122",
              email: "adebade@yopmail.com",
              password: "Qwerty112"
            }).expect(200)
            expect(data?.success).toEqual(true)
        })
      })
      describe('Create third User', () => {
        it('should return User Info is user login details is correct', async () => {
            const {body: data} = await request.post('/api/v1/user/register')
            .send({
              firstName: "Ibra",
              lastName: "Hiim",
              phone: "09013920152",
              email: "ibrahiim@yopmail.com",
              password: "Qwerty112"
            }).expect(200)
            expect(data?.success).toEqual(true)
        })
      })


})

