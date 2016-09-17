export default function registerViews(views, {format, formats, render}) {
  this.use(function viewMiddleware(req, res, next) {
    if(req.action) {
      req.template = views[req.action]
      if(!req.query) req.query = {}
      if(!req.params) req.params = {}
      const params = Object.assign(req.query, req.params)
      var type = formats[params.format]
      var accept = req.headers.accept || ''
      if(!render[type]) {
        type = accept.split(',').find(type => render[type]) || format
      }
      render[type](req, res, next)
    } else {
      next()
    }
  })
  return views
}
