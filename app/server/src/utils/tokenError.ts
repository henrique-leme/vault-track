import { DefaultError } from './defaultError'

type ErrorType = 'InvalidToken'

export class TokenError extends DefaultError<ErrorType> {}
