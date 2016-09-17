import express from 'express'
import server from '..'

const app = express()

module.exports = server(app, { cwd: __dirname })
  .then(context => {
    return (global.app = context).router
  })
