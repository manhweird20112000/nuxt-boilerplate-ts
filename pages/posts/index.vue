<script lang="ts" setup>
import { TodoService } from '~/api/todo'
const todoService = new TodoService()

const page = ref(1)

const { data, status, error, refresh, clear } = await useAsyncData(
  'todos',
  () => todoService.getTodos(),
  {
    watch: [page]
  }
)

useSeoMeta({
  title: 'Posts'
})
</script>
<template>
  <div>
    <button
      @click="
        () => {
          page++
        }
      "
    >
      Refresh
    </button>
    <button @click="clear">clear</button>
    <div>Posts {{ status }} {{ error }} {{ page }}</div>
    <ul>
      <li v-for="item in data" :key="item.id">
        <nuxt-link :to="'posts/' + item.id">{{ item.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>
