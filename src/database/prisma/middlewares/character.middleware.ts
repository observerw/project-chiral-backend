import type { Prisma } from '@prisma/client'

export const CharacterMiddleware: Prisma.Middleware = (params, next) => {
  if (!(params.model === 'Character')) { return next(params) }
  return next(params)
}

export default CharacterMiddleware
