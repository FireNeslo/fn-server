import glob from 'glob'
import path from 'path'
import nconf from 'nconf'
import {toXml} from './utils'

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
  formats: {
    'html': 'text/html',
    'json': 'application/json',
    'xml': 'application/xml'
  },
  render: {
    ['application/json'](req, res, next) {
      res.json(req.body)
    },
    ['application/xml'](req, res, next) {
      if(Array.isArray(req.body)) {
        var first = req.body
        var name = first && first.constructor ? first.constructor.name : 'Data'
        res.type('application/xml').end(toXml({[name]: req.body}, 'Response'))
      } else if(req.body.constructor === Object) {
        res.type('application/xml').end(toXml(req.body, 'Response'))
      } else {
        res.type('application/xml').end(toXml(req.body))
      }
    },
    ['text/html'](req, res, next) {
      res.render(req.template, req)
    }
  }
}
