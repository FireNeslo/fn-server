
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

const app = express()

server(app).then(context => {
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
+-- resource // define route /resource
|   +-- resource.model.js
|   +-- action.controller.js // action in [index show update create destroy]
|   +-- custom.controller.js // some post action on instance.
|   +-- action.view.pug // jade template to use for rendering.
|   +-- custom
|   |   +--action.controller.js // some custom collection action.
```

## Controllers
A controller is just an connect style middleware.
With the small extra feature of allowing you to return a body value.
The value can be either just an object or a promise.
```js
// server/greeting/show.controller.js
// get /greeting/world RESPONSE { hello: "world" }

module.exports = function (req, res, next) {
  return { hello: req.params.id }
}
```

## Views
By default we assume you have configure pug as your default rendering engine.
You are of course free to override this [See API](#API).

The views follow the same naming scheme as controllers.

```jade
// server/greeting/show.view.pug
// get /greeting/world RESPONSE <h1>hello world</h1>
h1 hello #{body.hello}
```

##API

## server(router, config)

Author: fireneslo@gmail.com

### Params:

* **function** *router* - Express style router

* **object** *config* - Configure loading and rendering

```js
/* defaults */
export const config = {
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
```
