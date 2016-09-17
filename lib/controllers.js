import {load} from './utils'

export const RESTFUL = {
  show: { method: 'get', action: [':id'] },
  update: { method: 'patch', action: [':id'] },
  destroy: { method: 'delete', action: [':id'] },
  create: { method: 'post', action: [] },
  index: { method: 'get', action: [] }
}

export function alias(name) {
  if(RESTFUL[name]) {
    return Object.assign({name}, RESTFUL[name])
  }
  return {method: 'post', action: [':id', name] }
}

export default function registerControllers(paths, options) {
  const controllers = {}
  if(options.setup) options.setup(this)
  if(options.before) options.before(this)
  if(options.middleware) options.middleware(this)
  Object.keys(paths).forEach(location => {
    const file = paths[location]
    const route = location.split('/')
    const {method, action} = alias(route.pop())
    const path = '/' + route.concat(action).join('/')
    const controller = new Promise(resolve => {
      load(file, controller => {
        var exists = controllers[location]
        controllers[location] = controller
        if(!exists) resolve(controller)
      })
    })
    this[method](path, (req, res, next) => {
      req.action = location
      controller
        .then(done => controllers[location](req, res, next))
        .then(data => {
           if(data != null) {
             req.body = data
             next()
           }
        })
        .catch(error => next(error))
    })
  })
  if(options.after) this.use(options.after)
  return controllers
}
