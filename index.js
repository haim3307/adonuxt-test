'use strict'

/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstrap Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass relative path from the project root.
*/
const express = require('express')
const app = express()
const { Ignitor } = require('@adonisjs/ignitor')

app.get('*', (req, res) => {
  new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer()
  .then(() => {
    return res.write(use('App/Services/Nuxt').build())
  })
  .then(() => {
    use('Logger').info('Nuxt is ready to handle requests')
  })
  .catch(console.error)
  res.write('<h1><marquee direction=right>Hello from Express path `/` on Now 2.0!</marquee></h1>')
  res.write('<h2>Go to <a href="/about">/about</a></h2>')
  res.end()
})

module.exports = app
