import type { Prisma } from '@prisma/client'

export const eventMiddleware: Prisma.Middleware = (params, next) => {
  if (params.model === 'Event') {
    if (params.action === 'delete') {
      params.action = 'update'
      params.args.data.deleted = new Date()
    }
    else if (params.action === 'deleteMany') {
      params.action = 'updateMany'
      params.args.data.deleted = new Date()
    }
  }
  return next(params)
}

export default eventMiddleware
