import Koa from 'koa'
import Router from 'koa-router'
import cors from 'kcors'
import bodyParser from 'koa-bodyparser'

export const setupApp = async () => {
  const app = new Koa()
  const router = new Router()

  app.use(cors())
  app.use(bodyParser())

  router.get('/', async (ctx) => {
    ctx.body = 'Hello World!'
  })

  app.use(router.routes()).use(router.allowedMethods())

  return app
}
