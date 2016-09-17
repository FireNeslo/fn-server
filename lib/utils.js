import globber from 'glob'
import chokidar from 'chokidar'

const MODULES = new Map()
const CALLBACKS = new Map()
const watcher = chokidar.watch([])

function update(path) {
  if(MODULES.has(path)) {
    delete require.cache[require.resolve(path)]
  }
  const callback = CALLBACKS.get(path)
  try {
    const module = require(path)
    MODULES.set(path, module)
    if(callback) callback(module)
  } catch(error) {
    console.error(error)
  }
}
function remove(path) {
  const callback = CALLBACKS.get(path)
  delete require.cache[require.resolve(path)]
  MODULES.delete(path)
  if(!callback) return
  callback(null)
}

watcher.on('add', update).on('change', update).on('unlink', remove)

export function map(callback) {
  return this.then(array => Promise.all(array.map(callback)))
}

export function toXml(data, wrapper, level=0, parent='Response') {
  if(!wrapper) {
    wrapper = data && data.constructor ? data.constructor.name : parent
  }
  if(Array.isArray(data)) {
    return data.map(data => toXml(data, null, level, wrapper)).join('\n')
  }
  if(data == null || typeof data !== 'object') return  `<${wrapper}>${data}</${wrapper}>`
  var attributes = '', children = '', indent= ' '.repeat(level*2)
  for(var key of Object.keys(data)) {
    var value = data[key]
    if(typeof value !== 'object' || value instanceof Date) {
      attributes += ' ' + key + '=' + JSON.stringify(value)
    } else {
      children += '\n' + toXml(value, key, level+1)
    }
  }

  children = children ? `>${children}\n${indent}</${wrapper}>` : ' />'

  return `${indent}<${wrapper}${attributes}${children}`
}

export function asMap(target={}) {
  return this.then(source => {
    for(var [key, value] of source) {
      target[key] = value
    }
    return target
  })
}

export function mapTo(callback) {
  return this::map(key => Promise.all([key, callback(key)]))::asMap()
}

export function glob(expression, options) {
  return new Promise((resolve, reject) => {
    globber(expression, options, (error, files) => {
      if(error) reject(error)
      else resolve(files)
    })
  })
}

export function load(file, callback) {
  watcher.add(file)
  CALLBACKS.set(file, callback)
}
