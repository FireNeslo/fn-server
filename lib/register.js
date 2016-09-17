import registerConfig from './config'
import registerModels from './models'
import registerControllers from './controllers'
import registerViews from './views'

export default function register(router, config) {
  if(typeof config === 'function') config = {before: config}
  return this.then(([controllers, models, views]) => {
    return {
      options: config,
      router: router,
      config: router::registerConfig(config),
      models: router::registerModels(models, config),
      controllers: router::registerControllers(controllers, config),
      views: router::registerViews(views, config)
    }
  })
}
