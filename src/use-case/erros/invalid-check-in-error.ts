export class InvalidCheckInError extends Error {
  constructor (readonly message: string) {
    super(message)
  }
}
