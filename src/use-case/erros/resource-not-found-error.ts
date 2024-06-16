export class ResourceNotFoundError extends Error {
  constructor (readonly resource: string, message: string) {
    super('User not found.')
  }
}
