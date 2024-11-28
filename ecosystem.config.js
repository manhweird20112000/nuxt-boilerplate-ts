module.exports = {
  apps: [
    {
      name: 'nuxt-base',
      port: '3020',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
