import { mongo } from '@/database'
import { config } from '@/config'
import { setupApp } from './setup-app'

export async function startApp() {
  await mongo()

  setupApp().then((app) => {
    const PORT = config.PORT

    app.listen(PORT, () => {
      console.log(`Server is running on: ${PORT}`)
    })
  })
}

startApp()
