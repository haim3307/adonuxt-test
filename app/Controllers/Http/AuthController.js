'use strict'
const User = use('App/Models/User')

class AuthController {
  async login ({ request, auth }) {
    const { email, password } = request.all()
    await auth
      .remember(true)
      .attempt(email, password)

    return 'Logged in successfully'
  }

  show ({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return 'You cannot see someone else\'s profile'
    }
    return auth.user
  }

  async logout ({ auth }) {
    await auth.logout()
  }

  async signup ({ request, auth, response, params }) {
    if (!params.validate) {
      // get user data from signup form
      const userData = request.only(['name', 'username', 'email', 'password'])

      try {
        // save user to database
        const user = await User.create(userData)
        // generate JWT token for user
        const token = await auth.generate(user)

        return response.json({
          status: 'success',
          data: token
        })
      } catch (error) {
        return response.status(400).json({
          status: 'error',
          message: 'There was a problem creating the user, please try again later.'
        })
      }
    }
    else {

    }
  }
}

module.exports = AuthController
