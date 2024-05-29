import mongoose from 'mongoose'
import accountModel from '../../src/models/account.model'
import transactionModel from '../../src/models/transaction.model'
import userModel from '../../src/models/user.model'
import {
  transactionAccountValidations,
  idempotencyCheck,
  createTransaction,
  verifyBalance,
  listTransactionsByAccountNumber,
  createDepositTransaction,
} from '../../src/services/transactionServices'
import { TransactionError } from '../../src/utils/transactionError'
import { TransactionData } from '@/modules/transaction/mutations/createTransaction'
import { findAccountByTaxId } from '../../src/services/accountServices'

jest.mock('../../src/services/accountServices')

describe('Transaction Services', () => {
  let userMock: any
  let accountMock: any

  beforeEach(async () => {
    await userModel.deleteMany({})
    await accountModel.deleteMany({})
    await transactionModel.deleteMany({})

    userMock = {
      _id: new mongoose.Types.ObjectId(),
      firstName: 'John',
      lastName: 'Doe',
      taxId: '1234567896',
      password: 'hashed-password',
    }

    accountMock = {
      accountNumber: 12345678900,
      userId: userMock._id,
      balance: new mongoose.Types.Decimal128('100.0'),
    }

    await userModel.create(userMock)
    await accountModel.create(accountMock),
      (findAccountByTaxId as jest.Mock).mockResolvedValue(accountMock)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  describe('transactionAccountValidations', () => {
    it('should validate sender and receiver accounts', async () => {
      const data: TransactionData = {
        sender: userMock.taxId,
        receiver: userMock.taxId,
        amount: 0,
        type: '',
      }
      const { senderAccount, receiverAccount } =
        await transactionAccountValidations(data)
      expect(senderAccount).toEqual(accountMock)
      expect(receiverAccount).toEqual(accountMock)
    })
  })

  describe('idempotencyCheck', () => {
    it('should return true if transaction with idempotencyId exists', async () => {
      const transaction = {
        idempotencyId: '12345',
        sender: accountMock.accountNumber,
        receiver: accountMock.accountNumber,
        amount: new mongoose.Types.Decimal128('50.0'),
        type: 'TRANSFER',
        description: 'Test transaction',
      }
      await transactionModel.create(transaction)

      const result = await idempotencyCheck('12345')
      expect(result).toBe(true)
    })

    it('should return false if transaction with idempotencyId does not exist', async () => {
      const result = await idempotencyCheck('nonexistent-id')
      expect(result).toBe(false)
    })
  })

  describe('createTransaction', () => {
    it('should create a new transaction', async () => {
      const data = {
        sender: userMock.taxId,
        receiver: userMock.taxId,
        amount: 50,
        type: 'TRANSFER',
        description: 'Test transaction',
      }
      await createTransaction(data, '12345')

      const transaction = await transactionModel.findOne({
        idempotencyId: '12345',
      })
      expect(transaction).toBeTruthy()
      expect(transaction!.amount.toString()).toBe('50')
    })
  })

  describe('verifyBalance', () => {
    it('should return true if balance is sufficient', async () => {
      const result = await verifyBalance(50, accountMock)
      expect(result).toBe(true)
    })

    it('should throw an error if balance is insufficient', async () => {
      await expect(verifyBalance(200, accountMock)).rejects.toThrow(
        TransactionError,
      )
    })
  })

  describe('listTransactionsByAccountNumber', () => {
    it('should list transactions for an account number', async () => {
      const transaction = {
        idempotencyId: '12345',
        sender: accountMock.accountNumber,
        receiver: accountMock.accountNumber,
        amount: new mongoose.Types.Decimal128('50.0'),
        type: 'TRANSFER',
        description: 'Test transaction',
      }
      await transactionModel.create(transaction)

      const transactions = await listTransactionsByAccountNumber(
        accountMock.accountNumber,
      )
      expect(transactions).toHaveLength(1)
      expect(transactions[0].amount).toBe(50.0)
    })
  })

  describe('createDepositTransaction', () => {
    it('should create a deposit transaction', async () => {
      const data = {
        sender: '0000000000', // Not used in this context
        receiver: userMock.taxId,
        amount: 100,
        type: 'DEPOSIT',
        description: 'Deposit transaction',
      }
      await createDepositTransaction(data, '67890')

      const transaction = await transactionModel.findOne({
        idempotencyId: '67890',
      })
      expect(transaction).toBeTruthy()
      expect(transaction!.amount.toString()).toBe('100')
    })
  })
})
