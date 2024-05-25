import Koa from 'koa'
import Router from 'koa-router'
import cors from 'kcors'
import bodyParser from 'koa-bodyparser'
import { graphqlSchema } from './schemas/graphql.schema'
import { graphqlHTTP } from 'koa-graphql'

export const setupApp = async () => {
  const app = new Koa()
  const router = new Router()

  app.use(cors())
  app.use(bodyParser())

  //   app.use(authentication)

  router.all(
    '/graphql',
    graphqlHTTP({
      schema: graphqlSchema,
      graphiql: true,
    }),
  )
  app.use(router.routes()).use(router.allowedMethods())

  return app
}
