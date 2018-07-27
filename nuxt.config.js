const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || []
  }
}


module.exports = {

  env: {
    CTF_SPACE_ID: '13a5i9k1tzk1',
    CTF_CDA_ACCESS_TOKEN: '6ffb6838228a5e0ff704461848ad0852c7154a3f457e73f9f6c89eea33d005b1',
//  CTF_PERSON_ID: config.CTF_PERSON_ID,
 //   CTF_BLOG_POST_TYPE_ID: config.CTF_BLOG_POST_TYPE_ID
  },

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | tailwindnuxt',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      {
        rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'
      }
    ]
  },
  /*
  ** Load global CSS
  */
  css: ['@/assets/css/main.css'],
  /*
  ** This option is given directly to the vue-router Router constructor
  */
  router: {
    base: '',
    linkActiveClass: 'is-active'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
+    ** Extract CSS
+    */
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      /*
      ** Cleanup CSS with PurgeCSS
      */
      if (!isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            extractors: [{
              extractor: TailwindExtractor,
              extensions: ["vue"]
            }],
            whitelist: ['html', 'body']
          })
        )
      }
    }
  }
}
