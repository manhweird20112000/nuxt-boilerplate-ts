import * as fs from 'fs'
import path from 'path'

// eslint-disable-next-line import/no-unresolved
import { createResolver } from '@nuxt/kit'
// eslint-disable-next-line import/no-unresolved
import tailwindcss from '@tailwindcss/vite'
// eslint-disable-next-line import/no-unresolved
import ElementPlus from 'unplugin-element-plus/vite'
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
        { name: 'fb:app_id', content: '' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preload', href: 'https://fonts.googleapis.com' },
        { rel: 'preload', href: 'https://fonts.gstatic.com' },
        {
          href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
          rel: 'stylesheet',
          crossorigin: 'anonymous'
        }
      ]
    }
  },

  ssr: false,

  // work when ssr: false
  spaLoadingTemplate: './app-loading.html',

  css: ['./assets/styles/index.scss', './assets/styles/tailwind.css'],

  modules: ['@pinia/nuxt', '@nuxtjs/sitemap', '@element-plus/nuxt', '@nuxtjs/robots', '@nuxtjs/i18n'],
  elementPlus: {
    importStyle: 'scss'
  },

  vite: {
    resolve: {
      alias: {
        '@': './'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "./assets/styles/element/index.scss" as *;',
          api: 'modern-compiler'
        }
      }
    },

    plugins: [
      tailwindcss(),
      ElementPlus({
        useSource: true
      })
    ],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '')
        }
      }
    }
  },

  imports: {
    autoImport: true,
    global: true,
    scan: true,
    dirs: ['shared/utils']
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
    defaultLocale: 'jp',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'jp', name: 'Japanese', file: 'jp.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
  compatibilityDate: '2024-11-04',
  hooks: {
    ready() {
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
