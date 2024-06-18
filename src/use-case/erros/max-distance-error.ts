export class MaxDistanceError extends Error {
  constructor (maxDistance: number) {
    super(`Max distance error, distance greater than ${maxDistance} km.`)
  }
}
