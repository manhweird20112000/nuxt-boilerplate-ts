<script setup lang="ts">
import PartialsItemList from '~/components/partials/item-list.vue'

const { translate } = useTranslate()

useWindowResize({
  resize(val: any) {
    console.log(val)
  }
})

const image = useAssets('images/demo.jpg')
const name = ref<string>('')

const showToast = async () => {
  Toast.success({ message: 'CALL API...' })
  await HttpService.get('api/todos/1', {})
}

const infiniteScroll = () => {}
</script>

<template>
  <div class="section-home">
    <client-only>
      <common-icon name="language" class-names="hover:stroke-red-600" :width="100" :height="100" />
      <common-icon name="language" color="#F0BB78" type="stroke" />
    </client-only>
    <common-button text="Click here" @click="showToast" />
    <nuxt-link to="/posts">Go to Posts </nuxt-link>
    <h1 class="text-3xl font-bold underline font-display">
      {{ Formatter.ellipsis('0x786533b400807Dc9664F2dEEF5bC974E9F85294B', 5, 'mesial') }}
    </h1>
    <h1 class="text-3xl font-bold underline font-display">{{ translate('welcome') }} {{ name }}</h1>
    <div class="size-20">
      <common-image fit="cover" :src="image" alt="image" />
    </div>
    <client-only>
      <common-scroll-infinite
        list-class-custom="h-[400px] overflow-y-auto"
        :data="[...Array(10000).keys()].map((item) => ({ id: item }))"
        key-extract="id"
        :item-render="PartialsItemList"
        @infinite="infiniteScroll"
      />
    </client-only>
  </div>
</template>
