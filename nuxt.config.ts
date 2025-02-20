import * as fs from 'node:fs'
import path from 'node:path'

import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

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
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preload', href: 'https://fonts.googleapis.com' },
        { rel: 'preload', href: 'https://fonts.gstatic.com' },
        { href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap', rel: 'stylesheet', crossorigin: 'anonymous' }
      ]
    }
  },

  ssr: true,

  // work when ssr: false
  spaLoadingTemplate: './app-loading.html',

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

  css: ['./assets/styles/index.scss'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  modules: ['@pinia/nuxt', '@nuxtjs/sitemap', '@element-plus/nuxt', '@nuxtjs/robots', '@nuxtjs/i18n'],

  vite: {
    resolve: {
      alias: {
        '@': './'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    plugins: []
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: process.env.VITE_API_URL,
    //       changeOrigin: true,
    //       rewrite: (path: string) => path.replace(/^\/api/, '')
    //     }
    //   }
    // }
  },

  typescript: {
    typeCheck: true,
    strict: true,
    tsConfig: {}
  },

  build: {},

  devServer: {
    host: '0.0.0.0',
    port: Number(process.env['PORT']) || 8000
  },

  i18n: {
    vueI18n: './infra/i18n/index.ts'
  },

  compatibilityDate: '2024-11-04',
  hooks: {
    ready() {
      console.log('GENERATE FILE ICON MAP')
      const data: Record<string, string> = {}
      const pathFolderIcon = path.join(process.cwd(), 'public', 'icons')
      if (!fs.existsSync(pathFolderIcon)) {
        return
      }

      const icons = fs.readdirSync(pathFolderIcon)

      icons.forEach((icon: string) => {
        const pathIcon = path.join(pathFolderIcon, icon)
        const filename: string = icon.split('.')[0]

        if (!filename) return

        data[filename] = fs.readFileSync(pathIcon).toString()
      })

      const pathSave = path.join(process.cwd(), 'generated')

      if (!fs.existsSync(pathSave)) {
        fs.mkdirSync(pathSave, { recursive: true })
      }

      fs.writeFileSync(path.join(pathSave, 'icons.json'), JSON.stringify(data))
    }
  }
})
