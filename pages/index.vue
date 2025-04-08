<script setup lang="ts">
import { EKeyStorage } from '#shared/common/contanst'
import { HttpService } from '~/shared/utils/api'

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
</script>

<template>
  <div>
    <common-button text="Click here" @click="showToast" />
    <h1 class="text-3xl font-bold underline font-display">{{ address }}</h1>
  </div>
</template>

<style scoped></style>
