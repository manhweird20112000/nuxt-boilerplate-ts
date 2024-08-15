<script setup lang="ts">
import { useSSR } from '~/composables/use-ssr'
import { useTranslate } from '~/composables/use-translate'

const count = ref()
const auth = ref<IAuth>({ id: 1 })
const message = ref<IResponse>({ message: 'OK' })
const { data, error, refresh, status, clear } = useSSR('users', 'users')
const { translate } = useTranslate()
console.log(translate('welcome'))
</script>

<template>
  <div>
    <div class="bg-red-500">
      {{ $t('welcome') }}
    </div>
    {{ status }}
    <ul>
      <li v-for="item in data" :key="item['id']">
        {{ item['name'] }}
      </li>
    </ul>
    <button @click="refresh()">refresh</button>
    <button @click="clear()">clear</button>
  </div>
</template>
