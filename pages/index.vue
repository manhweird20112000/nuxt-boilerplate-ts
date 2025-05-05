<script setup lang="ts">
const { translate } = useTranslate()

useWindowResize({
  resize(val: any) {
    console.log(val)
  }
})
</script>

<template>
  <div class="section-home">Hello World!</div>
</template>
