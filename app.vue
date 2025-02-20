<script setup lang="ts"></script>
<template>
  <nuxt-error-boundary>
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
    <template #error="{ error }">
      {{ error }}
    </template>
  </nuxt-error-boundary>
</template>
