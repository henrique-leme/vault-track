import { DefaultError } from './defaultError'

type ErrorType = 'TransactionError'

export class AccountError extends DefaultError<ErrorType> {}
