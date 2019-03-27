'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

const Drive = use('Drive')

const Helpers = use('Helpers')
const path = require('path')

Route.group(() => {
  Route.get('/global', () => {
    return Drive.get('../storage/cached-responses/global.json')
  })
  Route.get('/main/index.json', () => {
    return Drive.get('../storage/cached-responses/main-index.json')
  })
  Route.get('/dyo/diamond/:filter?', () => {
    return Drive.get('../storage/cached-responses/dyo-diamond.json')
  })
  Route.get('/diamonds', () => {
    return Drive.get('../storage/cached-responses/dyo-diamond.json')
  })
  Route.get('/dyo/color_diamond/:filter?', () => {
    return Drive.get('../storage/cached-responses/dyo-color_diamond.json')
  })
}
).prefix('api')
Route.any('*', 'NuxtController.render')
