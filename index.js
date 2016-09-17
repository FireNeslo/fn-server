import path from 'path'
import register from './lib/register'
import {CONFIG} from './lib/config'
import {glob, asMap, map} from './lib/utils'
function extractName(expression, file) {
  return new RegExp(expression.replace(/\*[/*]*/g, '(.*)')).exec(file).pop()
}

function nameMap(controller, cwd) {
  return this
    ::map(file => Promise.all([
      extractName(controller, file),
      path.resolve(cwd, file)
    ]))
    ::asMap()
}

module.exports = function routes(router, config=CONFIG) {
  const options = Object.assign({}, CONFIG, config)
  const {controllers, models, views, cwd} = options
  const ROUTES = Promise.all([
    glob(controllers, {cwd})::nameMap(controllers, cwd),
    glob(models, {cwd})::nameMap(models, cwd),
    glob(views, {cwd})::nameMap(views, cwd)
  ])
  return ROUTES::register(router, options)
}
