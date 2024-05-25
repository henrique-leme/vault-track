import { DefaultError } from './defaultError'

type ErrorType = 'AccountNotFound'

export class AccountError extends DefaultError<ErrorType> {}
