<script setup lang="ts">
import type { Component } from 'vue'

import { debounce } from 'lodash-es'
import VirtualList from 'vue3-virtual-scroll-list'

interface PaginationData {
  total?: number
  per_page?: number
  page?: number
}

interface ScrollInfiniteProps<T = Record<string, any>> {
  listClassCustom?: string
  paginateClass?: string
  loading?: boolean
  data: T[]
  keyExtract: keyof T | string
  itemRender: Component
  paginate?: PaginationData
  pageSizes?: number[]
  vitualItemRender?: number
}

const props = withDefaults(defineProps<ScrollInfiniteProps>(), {
  loading: false,
  listClassCustom: '',
  paginateClass: '',
  pageSizes: () => [10, 20, 50, 100],
  vitualItemRender: 100
})

const emits = defineEmits<{
  infinite: []
  paginate: [{ page: number; pageSize: number }]
}>()

const slots = useSlots()

const paginateData = ref<PaginationData>(props.paginate || { total: 100, per_page: 10, page: 1 })

/**
 * Handle infinite scrolling event with debounce
 */
const handleInfiniteLoad = debounce(() => {
  if (!props.paginate || slots.paginate) {
    emits('infinite')
  }
}, 500)

/**
 * Handle pagination change events
 */
function handlePaginateChange(page: number, pageSize: number): void {
  emits('paginate', { page, pageSize })
}
</script>

<template>
  <div class="grid grid-cols-1 gap-2">
    <virtual-list
      v-loading="(paginate || slots.paginate) && loading"
      :class="listClassCustom"
      :data-component="itemRender"
      :data-sources="data"
      :estimate-size="100"
      :keeps="vitualItemRender"
      :data-key="keyExtract"
      @tobottom="handleInfiniteLoad"
    >
      <template v-if="loading" #footer>
        <slot v-if="slots.footer" name="footer" />
        <div v-else>Loading...</div>
      </template>
    </virtual-list>

    <div v-if="paginate || slots.paginate" :class="paginateClass">
      <el-pagination
        v-if="!slots.paginate"
        v-model:current-page="paginateData.page"
        v-model:page-size="paginateData.per_page"
        background
        :page-sizes="pageSizes"
        layout="sizes, prev, pager, next"
        :total="paginateData.total"
        @change="handlePaginateChange"
      />

      <slot v-else name="paginate" />
    </div>
  </div>
</template>
