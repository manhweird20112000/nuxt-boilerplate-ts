<script setup lang="ts">
interface Props<T = object> {
  index: number
  source: T
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div>{{ source }}</div>
</template>

<style scoped></style>
