export default function registerViews(views, {format, render}) {
  this.use(function viewMiddleware(req, res, next) {
    if(req.action) {
      req.template = views[req.action]
      if(!req.query) req.query = {}
      if(!req.params) req.params = {}

      render[req.params.accept || format](req, res, next)
    } else {
      next()
    }
  })
  return views
}
