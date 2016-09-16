import registerModels from './models'
import registerControllers from './controllers'
import registerViews from './views'

export default function register(router, options) {
  return this.then(([controllers, models, views]) => {
    return {
      models: router::registerModels(models, options),
      controllers: router::registerControllers(controllers, options),
      views: router::registerViews(views, options)
    }
  })
}
