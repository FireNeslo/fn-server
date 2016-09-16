import {load} from './utils'

export function modelName(location) {
  const name = location.split('/').pop()
  const initial = name.slice(0, 1).toUpperCase()
  const tail = name.slice(1).replace(/[-_]./g, c => c[1].toUpperCase())
  return initial + tail
}

export default function registerModels(locations) {
  const models = {}

  Object.keys(locations).forEach(location => {
    const path = locations[location]
    const name = modelName(location)
    load(path, Model => {
      models[name] = Model
    })
  })

  this.use(function modelMiddleware(req, res, next) {
    req.models = models
    next()
  })

  return models
}
