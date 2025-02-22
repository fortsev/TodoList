<script setup lang="ts">
import {ref, computed} from "vue";
import AppHeader from "@/components/main/AppHeader.vue";
import AppFilters from "@/components/filter/AppFilters.vue";
import AppTodoList from "@/components/todo/AppTodoList.vue";
import AppAddTodo from "@/components/AppAddTodo.vue";
import {Film} from "@/types/Films";
import {Filter} from "@/types/Filters";
import {Stats} from "@/types/Stats";

const todos = ref<Film[]>([])

const activeTodos = computed<Film[]>(() => {
  return todos.value.filter(el => !el.viewed)
})

const doneTodos = computed<Film[]>(() => {
  return todos.value.filter(el => el.viewed)
})

const filters = ref<Filter[]>([
  { code: 'all', name: 'Все' },
  { code: 'active', name: 'Буду смотреть' },
  { code: 'done', name: 'Уже посмотрел' },
])

const activeFilter = ref<Filter>(filters.value[0])

const filterTodos = computed<Film[]>(() => {
  if (activeFilter.value.code === 'active') return activeTodos.value;
  if (activeFilter.value.code === 'done') return doneTodos.value;
  return todos.value
})

const stats = computed<Stats>(() => {
  return {
    active: activeTodos.value.length,
    done: doneTodos.value.length
  }
})

const toggleTodo = (id: number) => {
  const targetTodo = todos.value.find((todo: Film) => todo.id === id)

  if (targetTodo) {
    targetTodo.viewed = !targetTodo.viewed
  }
}

const removeTodo = (id: number) => {
  todos.value = todos.value.filter((todo: Film) => todo.id !== id)
}

const addTodo = (film: Film) => {
  if (todos.value.includes(film)) {
    alert('Этот фильм уже есть в вашем списке')
    return
  }
  todos.value.push(film)
}

const changeActiveFilter = (filter: Filter) => {
  activeFilter.value = filter
}
</script>

<template>
  <app-header />
  <app-filters :filters="filters" :active-filter="activeFilter" :stats="stats" @changeActiveFilter="changeActiveFilter"/>
  <main class="app-main">
    <app-todo-list :todos="filterTodos" @toggleTodo="toggleTodo" @removeTodo="removeTodo"/>
    <app-add-todo @addTodo="addTodo"/>
  </main>
</template>

<style>
.app-main {
  display: grid;
  gap: 1.6rem;
}
</style>