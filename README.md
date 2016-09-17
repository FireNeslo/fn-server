
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
const server = require('fn-server')
const nconf = require('nconf')
const path = require('path')

/* defaults */
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

## Directory structure
By default the system assumes the following folder structure.

```
server
+-- config
|   +-- defaults.json # shared config
|   +-- development.json # env config
+-- resource
|   +-- resource.model.js
|   +-- action.controller.js // action in [index show update create destroy]
|   +-- custom.controller.js // some post action on instance.
|   +-- action.view.pug // jade template to use for rendering.
|   +-- custom
|   |   +--action.controller.js // some custom collection action.
```

##API

## server(router, options)

Author: fireneslo@gmail.com

### Params:

* **function** *router* - Express style router

* **object** *options* - Configure loading and rendering
