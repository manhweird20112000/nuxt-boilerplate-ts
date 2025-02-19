<template>
  <nuxt-error-boundary>
    <nuxt-page />
    <template #error="{ error }">
      {{ error }}
    </template>
  </nuxt-error-boundary>
</template>
