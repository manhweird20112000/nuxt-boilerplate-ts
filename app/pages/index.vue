<script setup lang="ts">
const triggerError = () => {
  throw new Error('Nuxt Button Error')
}
const isOpenDialog = ref<boolean>(false)
</script>

<template>
  <div class="section-home"><common-button @click="triggerError">Click me</common-button></div>
</template>
