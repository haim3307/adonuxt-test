'use strict'

const resolve = require('path').resolve
const pkg = require('../package')
const webpack = require('webpack')

module.exports = {
  server: {
    port: 3000 // default: 3000
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Droid+Serif:400,400i,700,700i|Dancing+Script|Sacramento|Montserrat|Playfair+Display:400,400i,700,700i'
      }
    ],
    script: [
      { src: '/js/vendor/jquery-3.3.1.js', ssr: false },
      { src: '/js/vendor/jquery-migrate-1.4.1.min.js', ssr: false },
      { src: '/js/vendor/popper.min.js', ssr: false },
      { src: '/js/vendor/bootstrap.min.js', ssr: false },
      { src: 'https://code.iconify.design/1/1.0.0-rc7/iconify.min.js', ssr: false },
      { src: '/js/plugins.min.js', ssr: false },
      { src: '/js/active.js', ssr: false }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    { src: '~/assets/scss/base.scss', lang: 'sass' }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/global.js' },
    { src: '~/plugins/injectDataFromServer.js' },
    { src: '~plugins/ion-range-slider.js', ssr: false },
    { src: '~/plugins/vue2-filters.js' }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-typescript',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
    ['@nuxtjs/proxy', { secure: false, changeOrigin: true }],
    ['nuxt-validate', {
      lang: 'en',
      // regular vee-validate options
      inject: false
    }],
    '@nuxtjs/moment'

  ],
  typescript: {
    formatter: 'default'
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['jquery', 'ion-range-slider'],
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
    /*
    ** You can extend webpack config here
    */
    /**   extend(config, ctx) {
          // Run ESLint on save
          if (ctx.isDev && ctx.isClient) {
            config.module.rules.push({
              enforce: 'pre',
              test: /\.(js|vue)$/,
              loader: 'eslint-loader',
              exclude: /(node_modules)/,
              options: {
                fix: true
              }
            })
          }
        }*/
  },
  router: {
    extendRoutes (nuxtRoutes, resolve) {
      const routes = { ...require('../resources/pages/index.js') }
      console.log('routes:', routes)

      nuxtRoutes.forEach(nuxtRoute => {
        console.log(nuxtRoute.name in routes, 'has', nuxtRoute.name)
        console.log(nuxtRoute, 'meta:')

        if (nuxtRoute.name in routes) {
          let route = routes[nuxtRoute.name]
          let overriddenRoute = {}
          switch (route.mode) {
            case 'replace':
              console.log(resolve(__dirname, '..', 'resources', route.component), ':')
              overriddenRoute = {
                name: nuxtRoute.name,
                ...route,
                component: resolve(__dirname, '..', 'resources', route.component)
              }
              break

            case 'merge':
            default:
              overriddenRoute = {
                ...nuxtRoute,
                ...route

              }
              break

          }
          console.log(overriddenRoute, 'overriddenRoute')

          delete routes[nuxtRoute.name]

          nuxtRoute.meta = overriddenRoute.meta
        }
      })

      console.log(routes, 'routes left')
      Object.keys(routes).forEach(key => {
        nuxtRoutes.push({
          name: routes[key],
          ...routes[key],
          component: resolve(__dirname, '..', 'resources', routes[key].component)
        })
      })
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#4d94db' },
  /*
  ** Point to resources
  */
  srcDir: resolve(__dirname, '..', 'resources')
}
