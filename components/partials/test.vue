<script lang="ts" setup>
const amount = ref<number>(1)
</script>
<template>
  <div class="text-white font-bold text-2xl" @click="amount++">{{ amount }}</div>
</template>
