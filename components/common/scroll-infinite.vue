<script setup lang="ts">
interface Props {
  loading?: boolean
}

withDefaults(defineProps<Props>(), { loading: false })
const emits = defineEmits<{ infinite: [] }>()

const infiniteLoad = () => {
  emits('infinite')
  console.log('scroll')
}
</script>

<template>
  <div v-infinite-scroll="infiniteLoad" :infinite-scroll-immediate="false" :infinite-scroll-disabled="loading" class="h-[200px] overflow-y-scroll">
    <slot />
    <div v-loading="loading"></div>
  </div>
</template>
