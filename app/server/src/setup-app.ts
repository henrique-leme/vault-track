import Koa from 'koa'
import Router from 'koa-router'
import cors from 'kcors'
import bodyParser from 'koa-bodyparser'
import { graphqlSchema } from './schemas/graphql.schema'
import { graphqlHTTP } from 'koa-graphql'
import { contextMiddleware } from './middlewares/ctxMiddleware'

export const setupApp = async () => {
  const app = new Koa()
  const router = new Router()

  app.use(cors())
  app.use(bodyParser())

  app.use(contextMiddleware)

  router.all(
    '/graphql',
    graphqlHTTP(async (_req, _res, ctx) => {
      return {
        schema: graphqlSchema,
        graphiql: {
          headerEditorEnabled: true,
        },
        context: ctx.state.context,
      }
    }),
  )
  app.use(router.routes()).use(router.allowedMethods())

  return app
}
