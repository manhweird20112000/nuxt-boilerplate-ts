<template>
  <div>
    {{ data }}
  </div>
</template>

<script lang="ts" setup>
import { TodoService } from '~/api/todo'

const route = useRoute()
const todoService = new TodoService()
const { data } = await useAsyncData('todo', () => todoService.getTotoDetail(Number(route.params.id)))

useSeoMeta({
    title: (data.value as any).title
})
</script>
