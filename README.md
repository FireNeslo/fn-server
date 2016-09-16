
fn-server - v1.0.0
===
A helper for getting a skeleton app up and running by using conventions.

Check demo/index.js for usage
## Install
### npm
```bash
$ npm install fn-server --save
```
## Usage
```js
const express = require('express')
const server = require('fn-server');

/* defaults */
const config = {
  cwd: process.cwd(),
  format: 'application/json',
  views: './resource/**/*.view.pug',
  models: './resource/**/*.model.js',
  controllers: './resource/**/*.controller.js',
  render: {
    ['application/json'](req, res, next) {
      res.json(req.body)
    },
    ['text/html'](req, res, next) {
      res.render(req.template, req)
    }
  }
}

const app = express()

server(app, config).then(context => {
  app.listen(8080)
})

```

##API

## server(router, options)

Author: fireneslo@gmail.com

### Params:

* **function** *router* - Express style router

* **object** *options* - Configure loading and rendering
