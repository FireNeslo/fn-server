import glob from 'glob'
import path from 'path'

export default {
  cwd: process.cwd(),
  format: 'application/json',
  views: './resource/**/*.view.pug',
  models: './resource/**/*.model.js',
  controllers: './resource/**/*.controller.js',
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
