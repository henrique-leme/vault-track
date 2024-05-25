import { DefaultError } from './defaultError'

type ErrorType = 'UserAlreadyExistis' | 'UserNotFound' | 'AutenticationFailed'

export class UserError extends DefaultError<ErrorType> {}
