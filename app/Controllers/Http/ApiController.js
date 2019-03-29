'use strict'
const User = use('App/Models/User')

class ApiController {
  getUsers () {
    return User.all()
  }
}

module.exports = ApiController
