import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: process.env['APP_NAME'] || '',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [

        { name: 'description', content: process.env['APP_NAME'] || '' },
        { name: 'fb:app_id', content: '' },
        { hid: 'og:image', property: 'og:image', content: '/favicon.svg' },
        { hid: 'twitter:image', property: 'twitter:image', content: '/favicon.svg' },
        { hid: 'twitter:description', property: 'twitter:description', content: '' },
        { hid: 'twitter:card', property: 'twitter:card', content: '' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap', rel: 'stylesheet' }
      ]
    }
  },
  ssr: true,
  components: [
    {
      prefix: 'common',
      global: true,
      path: resolve('./components/common')
    },
    {
      prefix: 'layout',
      global: true,
      path: resolve('./components/layouts')
    },
    {
      prefix: 'page',
      global: true,
      path: resolve('./components/pages')
    },
    {
      prefix: 'partial',
      global: true,
      path: resolve('./components/partials')
    }
  ],
  css: ['@/assets/styles/index.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  modules: ['@pinia/nuxt', '@nuxtjs/sitemap', '@element-plus/nuxt'],
  vite: {
    resolve: {
      alias: {
        '@': './'
      }
    },
    plugins: []
  },
  typescript: {
    typeCheck: true,
    strict: true,
    tsConfig: {}
  }
})
