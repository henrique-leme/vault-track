import mongoose from 'mongoose'
import accountModel from '../../src/models/account.model'
import transactionModel from '../../src/models/transaction.model'
import userModel from '../../src/models/user.model'
import {
  createAccount,
  calculateBalance,
  updateBalance,
  findAccountByUserId,
  findAccountByTaxId,
  findAccountAndUpdatedBalance,
  deleteAccount,
} from '../../src/services/accountServices'
import { AccountError } from '../../src/utils/accountError'
import { UserError } from '../../src/utils/userError'

describe('Account Services', () => {
  let userMock: any

  beforeEach(async () => {
    await userModel.deleteMany({})
    await accountModel.deleteMany({})
    await transactionModel.deleteMany({})
    userMock = {
      _id: new mongoose.Types.ObjectId(),
      firstName: 'Henrique',
      lastName: 'Leme',
      taxId: '123456789',
      password: 'hashed-password',
    }

    await userModel.create(userMock)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  describe('createAccount', () => {
    it('should create a new account for a user', async () => {
      await createAccount(userMock._id)

      const createdAccount = await accountModel.findOne({
        userId: userMock._id,
      })
      expect(createdAccount).toBeTruthy()
      expect(createdAccount).toHaveProperty('accountNumber')
    })
  })

  describe('calculateBalance', () => {
    it('should calculate the current balance for an account', async () => {
      const account = await accountModel.create({
        accountNumber: 1234567890,
        userId: userMock._id,
        balance: new mongoose.Types.Decimal128('0.0'),
      })

      await transactionModel.create([
        {
          idempotencyId: '1',
          sender: account.accountNumber,
          receiver: 1111111111,
          amount: new mongoose.Types.Decimal128('50.0'),
          type: 'TRANSFER',
          createdAt: new Date(),
        },
        {
          idempotencyId: '2',
          sender: 1111111111,
          receiver: account.accountNumber,
          amount: new mongoose.Types.Decimal128('100.0'),
          type: 'TRANSFER',
          createdAt: new Date(),
        },
      ])

      const balance = await calculateBalance(account.accountNumber)
      expect(balance[0].balance.toString()).toEqual('50.0')
    })
  })

  describe('updateBalance', () => {
    it('should update the balance for an account', async () => {
      const account = await accountModel.create({
        accountNumber: 1234567890,
        userId: userMock._id,
        balance: new mongoose.Types.Decimal128('0.0'),
      })

      await transactionModel.create([
        {
          idempotencyId: '1',
          sender: account.accountNumber,
          receiver: 1111111111,
          amount: new mongoose.Types.Decimal128('50.0'),
          type: 'TRANSFER',
          createdAt: new Date(),
        },
        {
          idempotencyId: '2',
          sender: 1111111111,
          receiver: account.accountNumber,
          amount: new mongoose.Types.Decimal128('100.0'),
          type: 'TRANSFER',
          createdAt: new Date(),
        },
      ])

      await updateBalance(account.accountNumber)

      const updatedAccount = await accountModel.findOne({
        accountNumber: account.accountNumber,
      })

      expect(updatedAccount!.balance.toString()).toEqual('50.0')
    })
  })

  describe('findAccountByUserId', () => {
    it('should find an account by userId', async () => {
      await accountModel.create({
        accountNumber: 1234567890,
        userId: userMock._id,
        balance: new mongoose.Types.Decimal128('0.0'),
      })

      const foundAccount = await findAccountByUserId(userMock._id)

      expect(foundAccount).toBeTruthy()
      expect(foundAccount!.userId.toString()).toEqual(userMock._id.toString())
    })

    it('should throw an error if no account is found', async () => {
      await expect(
        findAccountByUserId(new mongoose.Types.ObjectId()),
      ).rejects.toThrow(AccountError)
    })
  })

  describe('findAccountByTaxId', () => {
    it('should find an account by user taxId', async () => {
      await accountModel.create({
        accountNumber: 1234567890,
        userId: userMock._id,
        balance: new mongoose.Types.Decimal128('0.0'),
      })

      const foundAccount = await findAccountByTaxId(userMock.taxId)

      expect(foundAccount).toBeTruthy()
      expect(foundAccount!.userId.toString()).toEqual(userMock._id.toString())
    })

    it('should throw an error if no user is found', async () => {
      await expect(findAccountByTaxId('nonexistent')).rejects.toThrow(UserError)
    })
  })

  describe('findAccountWithUpdatedBalance', () => {
    it('should find an account and update its balance by user taxId', async () => {
      const account = await accountModel.create({
        accountNumber: 1234567890,
        userId: userMock._id,
        balance: new mongoose.Types.Decimal128('0.0'),
      })

      await transactionModel.create([
        {
          idempotencyId: '1',
          sender: account.accountNumber,
          receiver: 1111111111,
          amount: new mongoose.Types.Decimal128('50.0'),
          type: 'TRANSFER',
          createdAt: new Date(),
        },
        {
          idempotencyId: '2',
          sender: 1111111111,
          receiver: account.accountNumber,
          amount: new mongoose.Types.Decimal128('100.0'),
          type: 'TRANSFER',
          createdAt: new Date(),
        },
      ])

      const updatedAccount = await findAccountAndUpdatedBalance(userMock.taxId)
      expect(updatedAccount).toBeTruthy()
      expect(updatedAccount.balance).toEqual(50)
    })

    it('should throw an error if no user is found', async () => {
      await expect(findAccountAndUpdatedBalance('nonexistent')).rejects.toThrow(
        UserError,
      )
    })
  })

  describe('deleteAccount', () => {
    it('should delete an account if balance is zero', async () => {
      const account = await accountModel.create({
        accountNumber: 1234567890,
        userId: userMock._id,
        balance: new mongoose.Types.Decimal128('0.0'),
      })

      await deleteAccount(account.accountNumber)

      const deletedAccount = await accountModel.findOne({
        accountNumber: account.accountNumber,
      })

      expect(deletedAccount).toBeNull()
    })

    it('should throw an error if balance is not zero', async () => {
      const account = await accountModel.create({
        accountNumber: 1234567890,
        userId: userMock._id,
        balance: new mongoose.Types.Decimal128('0.0'),
      })

      await transactionModel.create([
        {
          idempotencyId: '1',
          sender: account.accountNumber,
          receiver: 1111111111,
          amount: new mongoose.Types.Decimal128('50.0'),
          type: 'TRANSFER',
          createdAt: new Date(),
        },
        {
          idempotencyId: '2',
          sender: 1111111111,
          receiver: account.accountNumber,
          amount: new mongoose.Types.Decimal128('100.0'),
          type: 'TRANSFER',
          createdAt: new Date(),
        },
      ])

      await expect(deleteAccount(account.accountNumber)).rejects.toThrow(
        AccountError,
      )
    })
  })
})
