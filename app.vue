<script setup lang="ts">
const count = ref()
const auth = ref<IAuth>({ id: 1 })
const message = ref<IResponse>({ message: 'OK' })
</script>

<template>
  <div>
    <div class="bg-red-500">{{ $t('welcome') }}</div>
    <common-field />
    <el-button>OK</el-button>
  </div>
</template>
