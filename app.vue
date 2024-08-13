<script setup lang="ts">
const count = ref()
const auth = ref<IAuth>({ id: 1 })
const message = ref<IResponse>({ message: 'OK' })

// const { data, status, error, refresh, clear } = await useAsyncData('todo', () => $fetch('/api/todos/1'))
</script>

<template>
  <div>
    <div class="bg-red-500">
      {{ $t('welcome') }}
    </div>
  </div>
</template>
