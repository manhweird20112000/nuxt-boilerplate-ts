<script setup lang="ts">
import { CommonButton } from '#components'
import { EKeyStorage } from '#shared/common/contanst'
import PartialsItemList from '~/components/partials/item-list.vue'

const { translate } = useTranslate()

const name = ref<string>('')

const showToast = async () => {
  Toast.success({ message: 'CALL API...' })
  const resp = await HttpService.get('todos/1', {})
  console.log(resp)
}

const setToken = () => {
  StorageData.setStorage(EKeyStorage.auth, 'HI')
}

const address = computed(() => {
  return Formatter.ellipsis('0x786533b400807Dc9664F2dEEF5bC974E9F85294B', 5, 'mesial')
})

const infiniteScroll = () => {
  console.log('SCROLL ')
}
</script>

<template>
  <div>
    <common-button text="Click here" @click="showToast" />
    <h1 class="text-3xl font-bold underline font-display">{{ address }}</h1>
    <h1 class="text-3xl font-bold underline font-display">{{ translate('welcome') }} {{ name }}</h1>

    <common-scroll-infinite
      :paginate="{ total: 100, per_page: 10, page: 1 }"
      list-class-custom="h-[400px] overflow-y-auto"
      :data="[...Array(10).keys()].map((item) => ({ id: item }))"
      key-extract="id"
      :item-render="PartialsItemList"
      @infinite="infiniteScroll"
    >
    </common-scroll-infinite>
  </div>
</template>

<style scoped></style>
