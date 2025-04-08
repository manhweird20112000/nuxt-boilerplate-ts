<script setup lang="ts">
import _ from 'lodash'
import VirtualList from 'vue3-virtual-scroll-list'

interface Props<T = object> {
  listClassCustom?: string
  paginateClass?: string
  loading?: boolean
  data: T[]
  keyExtract: keyof T | string
  itemRender: Component
  paginate?: { total: number; per_page: number; page: number }
  pageSizes?: number[]
}

const props = withDefaults(defineProps<Props>(), { loading: false, listClassCustom: '', paginateClass: '', pageSizes: () => [10, 20, 50, 100] })
const emits = defineEmits<{ infinite: []; paginate: [{ page: number; pageSize: number }] }>()

const slots: any = useSlots()

const paginateData = ref<Required<Props>['paginate']>(props.paginate || { total: 100, per_page: 10, page: 1 })

const infiniteLoad = _.debounce(() => {
  emits('infinite')
}, 500)

const paginateChange = (page: number, pageSize: number) => {
  emits('paginate', { page, pageSize })
}
</script>

<template>
  <div class="grid grid-cols-1 gap-2">
    <virtual-list
      v-loading="(paginate || slots['paginate']) && loading"
      :class="listClassCustom"
      :data-component="itemRender"
      :data-sources="data"
      :data-key="keyExtract"
      @tobottom="infiniteLoad"
    >
      <template v-if="loading" #footer>
        <div>Loading...</div>
      </template>
    </virtual-list>

    <div :class="paginateClass" v-if="paginate || slots['paginate']">
      <el-pagination
        v-if="!slots['paginate']"
        v-model:current-page="paginateData.page"
        v-model:page-size="paginateData.per_page"
        background
        :page-sizes="pageSizes"
        layout="sizes, prev, pager, next"
        :total="paginateData.total"
        @change="paginateChange"
      />

      <slot v-else name="paginate" />
    </div>
  </div>
</template>
