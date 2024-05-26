import { Context, Next } from 'koa'

export const contextMiddleware = async (ctx: Context, next: Next) => {
  const idempotencyId: string | undefined = ctx.request.headers[
    'idempotencyId'
  ] as string | undefined
  const jwt = ctx.request.headers['authorization']
    ? (ctx.request.headers['authorization'] as string).replace('Bearer ', '')
    : undefined

  ctx.state.context = {
    idempotencyId,
    jwt,
    headers: ctx.request.headers,
  }

  await next()
}
