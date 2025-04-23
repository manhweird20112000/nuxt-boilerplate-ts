<script setup lang="ts">
import PartialsItemList from '~/components/partials/item-list.vue'

const { translate } = useTranslate()

const image = useAssets('images/demo.jpg')
const name = ref<string>('')

const showToast = async () => {
  Toast.success({ message: 'CALL API...' })
  const resp = await HttpService.get('todos/1', {})
  console.log(resp)
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
    <nuxt-link to="/posts">Go to Posts </nuxt-link>
    <h1 class="text-3xl font-bold underline font-display">{{ address }}</h1>
    <h1 class="text-3xl font-bold underline font-display">{{ translate('welcome') }} {{ name }}</h1>
    <div class="size-20">
      <common-image fit="cover"
        :src="image"
        alt="image" />
    </div>
    <client-only>
      <common-scroll-infinite list-class-custom="h-[400px] overflow-y-auto"
        :data="[...Array(1000).keys()].map((item) => ({ id: item }))" key-extract="id" :item-render="PartialsItemList"
        @infinite="infiniteScroll">
      </common-scroll-infinite>

    </client-only>
  </div>
</template>

<style scoped></style>
