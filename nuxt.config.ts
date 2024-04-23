// eslint-disable-next-line import/no-unresolved
import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'NUXT'
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
