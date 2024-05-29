import mongoose from 'mongoose'
import userModel from '../../src/models/user.model'
import { createAccount } from '../../src/services/accountServices'
import {
  hashPassword,
  validatePassword,
} from '../../src/utils/encryptedPassword'
import {
  validateExistingUser,
  validateUserExists,
  validateUserAndPassword,
  createUser,
  findUser,
  deleteUserByTaxId,
  updateUser,
} from '../../src/services/userServices'
import { UserError } from '../../src/utils/userError'
import { RegisterUserData } from '@/modules/user/mutations/registerUserMutation'
import { UpdateUserData } from '@/modules/user/mutations/updateUserMutation'

jest.mock('../../src/utils/encryptedPassword', () => ({
  validatePassword: jest.fn(),
  hashPassword: jest.fn(),
}))

jest.mock('../../src/services/accountServices')

describe('User Service', () => {
  let userMock: {
    _id: any
    firstName: string
    lastName: string
    taxId: string
    password: string
    save: jest.Mock<any, any, any>
  }

  beforeEach(async () => {
    userMock = {
      _id: new mongoose.Types.ObjectId(),
      firstName: 'Henrique',
      lastName: 'Leme',
      taxId: '123456789',
      password: 'hashed-password',
      save: jest.fn(),
    }
    await userModel.deleteMany({})
  })
  afterEach(async () => {
    jest.resetAllMocks()
  })

  describe('validateExistingUser', () => {
    it('should throw an error if user exists', async () => {
      await userModel.create(userMock)
      await expect(validateExistingUser('123456789')).rejects.toThrow(UserError)
    })

    it('should return false if user does not exist', async () => {
      await expect(validateExistingUser('123456789')).resolves.toBe(false)
    })
  })

  describe('validateUserExists', () => {
    it('should return true if user exists', async () => {
      await userModel.create(userMock)
      await expect(validateUserExists('123456789')).resolves.toBe(true)
    })

    it('should throw an error if user does not exist', async () => {
      await expect(validateUserExists('123456789')).rejects.toThrow(UserError)
    })
  })

  describe('validateUserAndPassword', () => {
    it('should return the user if credentials are valid', async () => {
      await userModel.create(userMock)
      ;(validatePassword as jest.Mock).mockResolvedValue(true)

      const result = await validateUserAndPassword('123456789', 'password')
      expect(result).toHaveProperty('_id', userMock._id)
      expect(result).toHaveProperty('firstName', userMock.firstName)
      expect(result).toHaveProperty('lastName', userMock.lastName)
      expect(result).toHaveProperty('taxId', userMock.taxId)
      expect(result).toHaveProperty('password', userMock.password)

      expect(validatePassword).toHaveBeenCalledWith(
        'password',
        'hashed-password',
      )
    })

    it('should throw an error if user does not exist', async () => {
      await expect(
        validateUserAndPassword('123456789', 'password'),
      ).rejects.toThrow(UserError)
    })
  })

  describe('createUser', () => {
    it('should create a new user and return it', async () => {
      const userData: RegisterUserData = {
        firstName: 'Henrique',
        lastName: 'Leme',
        taxId: '123456789',
        password: 'password',
      }

      ;(hashPassword as jest.Mock).mockResolvedValue('hashed-password')
      ;(createAccount as jest.Mock).mockResolvedValue(true)

      const createdUser = await createUser(userData)

      expect(hashPassword).toHaveBeenCalledWith('password')
      expect(createAccount).toHaveBeenCalledWith(createdUser._id)
      expect(createdUser.firstName).toEqual('Henrique')
    })
  })

  describe('findUser', () => {
    it('should return the user if found', async () => {
      await userModel.create(userMock)

      await expect(findUser('123456789')).resolves.toBeTruthy()
    })

    it('should return false if user not found', async () => {
      await expect(findUser('123456789')).resolves.toBe(false)
    })
  })

  describe('deleteUserByTaxId', () => {
    it('should delete the user and return true', async () => {
      await userModel.create(userMock)

      await expect(deleteUserByTaxId('123456789')).resolves.toBe(true)
    })
  })

  describe('updateUser', () => {
    it('should update the user information and return the updated user', async () => {
      await userModel.create(userMock)

      const updateData: UpdateUserData = {
        firstName: 'Felipe',
        lastName: 'Brito',
        password: 'current-password',
        newPassword: 'new-password',
      }

      ;(validatePassword as jest.Mock).mockResolvedValue(true)
      ;(hashPassword as jest.Mock).mockResolvedValue('hashed-new-password')

      const updatedUser = await updateUser('123456789', updateData)

      expect(hashPassword).toHaveBeenCalledWith('new-password')
      expect(updatedUser!.firstName).toEqual('Felipe')
    })

    it('should update the user information without password change', async () => {
      await userModel.create(userMock)

      const updateData: UpdateUserData = {
        firstName: 'Felipe',
        lastName: 'Brito',
        password: 'current-password',
      }

      ;(validatePassword as jest.Mock).mockResolvedValue(true)

      const updatedUser = await updateUser('123456789', updateData)

      expect(updatedUser).not.toBeNull()
      expect(updatedUser!.firstName).toEqual('Felipe')
    })
  })
})
