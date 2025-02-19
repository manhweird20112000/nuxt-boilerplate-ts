<script setup lang="ts">
import { useSSR } from '~/composables/use-ssr'
import { useTranslate } from '~/composables/use-translate'

const count = ref()
const auth = ref<IAuth>({ id: 1 })
const message = ref<IResponse>({ message: 'OK' })
const emits = defineEmits<{
  change: [id: number]
}>()
const { data, error, refresh, status, clear } = useSSR('users', 'users')
const users = ref(data)
const { translate } = useTranslate()

const text = computed<string>(() => translate('welcome'))

const errors = reactive({
  num: 1
})
</script>

<template>
  <nuxt-error-boundary>
    <div>
      <div
        class="bg-red-500"
        @click="
          () => {
            auth.id = 2
            errors.num = 6
          }
        "
      >
        {{ $t('welcome') }} {{ auth.id }}
      </div>
      {{ status }}
      <ul>
        <li v-for="item in users" :key="item['id']">
          {{ item['name'] }}
        </li>
      </ul>
      <button @click="refresh()">refresh</button>
      <button @click="clear()">clear</button>
    </div>
    <nuxt-page />
    <template #error="{ error }">
      {{ error }}
    </template>
  </nuxt-error-boundary>
</template>
