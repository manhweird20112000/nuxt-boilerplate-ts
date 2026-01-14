<script setup lang="ts">
useWindowResize({
  resize(val: any) {
    console.log(val)
  }
})

const isOpenDialog = ref<boolean>(false)
</script>

<template>
  <div class="section-home">
    Hello World!
    <button @click="isOpenDialog = !isOpenDialog">Click open dialog</button>
    <common-dialog v-model="isOpenDialog" auto-reset>
      <template #content> <div class="h-[200vh] w-[100px] bg-red-600"></div></template>
    </common-dialog>
  </div>
</template>
