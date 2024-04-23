<template>
  <div class="bg-red-500">hehe</div>
  <common-field />
</template>

<script setup lang="ts">
const count = ref();
const auth = ref<IAuth>({ id: 1 });
const message = ref<IResponse>({ message: "OK" });
</script>
