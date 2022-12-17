// export interface IError {
//   code: number
//   message?: string
// }

// export type IResponse<T = undefined> = IError & { data: T }

// export const success = <T>(data?: T): IResponse<T> => ({ code: 200, data })

// export const error = <T>(code: number, message?: string, data?: T) => ({ code, message, data })

// export const badRequest = <T>(message?: string, data?: T) => error(400, message, data)

// export const unauthorized = <T>(message?: string, data?: T) => error(401, message, data)

// export const forbidden = <T>(message?: string, data?: T) => error(403, message, data)

// export const notFound = <T>(message?: string, data?: T) => error(404, message, data)

// export const conflict = <T>(message?: string, data?: T) => error(409, message, data)

// export const iternalServerError = <T>(message?: string, data?: T) => error(500, message, data)

// export const notImplemented = <T>(message?: string, data?: T) => error(501, message, data)

// export default {
//   success,
//   error,
//   badRequest,
//   unauthorized,
//   forbidden,
//   notFound,
//   conflict,
//   iternalServerError,
//   notImplemented,
// }
