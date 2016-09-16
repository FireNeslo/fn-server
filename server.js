const PORT = process.env.PORT || 8080

require("babel-register")({
  presets: ['es2015', 'stage-0']
})

require('./demo').then(app => {
  return app.listen(PORT, done => {
    console.log('listening', PORT)
  })
})
