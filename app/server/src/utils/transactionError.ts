import { DefaultError } from './defaultError'

type ErrorType = 'NotEnoughBalance' | 'TransactionFailed'

export class TransactionError extends DefaultError<ErrorType> {}
