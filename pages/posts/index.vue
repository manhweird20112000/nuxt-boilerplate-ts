<template>
  <div>Posts</div>
  <ul>
    <li v-for="item in data" :key="item.id">
        <nuxt-link :to="'posts/' + item.id">{{ item.title }}</nuxt-link>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { TodoService } from '~/api/todo'
const todoService = new TodoService()
const { data } = await useAsyncData('todos', () => todoService.getTodos())

useSeoMeta({
    title: 'Posts'
})
</script>
