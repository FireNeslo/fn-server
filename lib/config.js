import glob from 'glob'
import path from 'path'
import nconf from 'nconf'

export default function registerConfig(config) {
  var configuration = config.configuration()
  this.use(function configMiddleware(req, res, next) {
    req.config = configuration
    next()
  })
  return configuration
}

export const CONFIG = {
  cwd: process.cwd(),
  env: process.env.NODE_ENV || 'development',
  format: 'application/json',
  views: './server/**/*.view.pug',
  models: './server/**/*.model.js',
  controllers: './server/**/*.controller.js',
  config: path.join('server', 'config'),
  configuration() {
    return nconf.argv().env()
      .file('default', path.join(this.cwd, this.config, 'index.json'))
      .file('default', path.join(this.cwd, this.config, 'config.json'))
      .file('default', path.join(this.cwd, this.config, 'defaults.json'))
      .file('env', path.join(this.cwd, this.config, this.env + '.json'))
  },
  render: {
    ['application/json'](req, res, next) {
      console.log('json')
      res.json(req.body)
    },
    ['text/html'](req, res, next) {
      console.log('html')
      res.render(req.template, req)
    }
  }
}
