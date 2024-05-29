import { DefaultError } from './defaultError'

type ErrorType = 'InvalidToken' | 'UnauthorizedToken'

export class TokenError extends DefaultError<ErrorType> {}
