<script setup lang="ts">
import PartialsItemList from '~/components/partials/item-list.vue'

const { translate } = useTranslate()

useWindowResize({
  resize(val: any) {
    console.log(val)
  }
})

const infiniteScroll = () => {}
</script>

<template>
  <div class="section-home">
    <common-icon name="language" class-names="hover:stroke-red-600" :width="100" :height="100" />
    <common-icon name="language" color="#F0BB78" type="stroke" />
    <lazy-nuxt-img src="https://i.pinimg.com/736x/14/08/30/140830b90e252f778cd1a55b8df3ff54.jpg" />
    <common-button text="Click here" />
    <nuxt-link to="/posts">Go to Posts </nuxt-link>
    <h1 class="text-3xl font-bold underline font-display">
      {{ Formatter.ellipsis('0x786533b400807Dc9664F2dEEF5bC974E9F85294B', 5, 'mesial') }}
    </h1>
    <h1 class="text-3xl font-bold underline font-display">{{ translate('welcome') }}</h1>
    <common-image
      src="https://i.pinimg.com/736x/14/08/30/140830b90e252f778cd1a55b8df3ff54.jpg"
      alt="image"
    />
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
