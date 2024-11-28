module.exports = {
  apps: [
    {
      name: 'nuxt-base',
      port: process.env.PORT,
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        port: process.env.PORT
      }
    }
  ]
}
