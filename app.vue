<script setup lang="ts">
const count = ref()
const auth = ref<IAuth>({ id: 1 })
const message = ref<IResponse>({ message: 'OK' })
console.log(import.meta.env.VITE_DEV_MODE)
</script>

<template>
  <div>
    <div class="bg-red-500">
      {{ $t('welcome') }}
    </div>
    <common-field />
    <el-button>OK</el-button>
    <common-editor />
  </div>
</template>
