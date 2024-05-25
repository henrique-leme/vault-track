export class DefaultError<T extends string> extends Error {
  name: T
  message: string
  cause: any

  constructor({
    name,
    message,
    cause,
  }: {
    name: T
    message: string
    cause?: any
  }) {
    super(message)
    this.name = name
    this.message = message
    this.cause = cause
  }
}
