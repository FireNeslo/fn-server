module.exports = function(req, res, next) {
  const {Greeting} = req.models

  return [
    new Greeting(req.params.id),
    new Greeting(req.params.id),
    new Greeting(req.params.id)
  ]
}
