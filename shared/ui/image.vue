<script lang="ts" setup>
import { Picture } from '@element-plus/icons-vue'

interface Props {
  src: string
  alt: string
  fit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
}

withDefaults(defineProps<Props>(), {
  fit: 'contain'
})
</script>

<template>
  <el-image lazy loading="lazy" :fit :src :alt class="common-image">
    <template #error>
      <div class="flex items-center justify-center size-full bg-gray-300">
        <el-icon><Picture /></el-icon>
      </div>
    </template>
    <template #placeholder>
      <el-skeleton animated loading :count="1" class="size-full!">
        <template #template>
          <el-skeleton-item variant="image" class="size-full!" />
        </template>
      </el-skeleton>
    </template>
  </el-image>
</template>

<style lang="scss">
.common-image {
  max-width: 100%;
  width: 100%;
  height: 100%;
}
</style>
