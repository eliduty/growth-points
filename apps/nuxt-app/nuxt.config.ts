// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@unocss/nuxt'],
  nitro: {
    preset: 'node-server',
    output: {
      dir: '.edgeone',
      publicDir: '.edgeone/assets',
      serverDir: '.edgeone/server-handler',
    },
  },
})
