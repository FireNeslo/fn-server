import express from 'express'
import Server from '..'

const app = express()

module.exports = Server(app, { cwd: __dirname })
  .then(context => {
    global.app = context
    return app
  })
