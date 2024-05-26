import { DefaultError } from './defaultError'

type ErrorType = 'AccountNotFound' | 'UpdateBalanceError'

export class AccountError extends DefaultError<ErrorType> {}
