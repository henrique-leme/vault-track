import { DefaultError } from './defaultError'

type ErrorType = 'AccountNotFound' | 'UpdateBalanceError' | 'DeleteAccountError'

export class AccountError extends DefaultError<ErrorType> {}
