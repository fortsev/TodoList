<script setup lang="ts">
import {ref, computed} from "vue";
import AppHeader from "@/components/main/AppHeader.vue";
import AppFilters from "@/components/AppFilters.vue";
import AppTodoList from "@/components/todo/AppTodoList.vue";
import AppAddTodo from "@/components/AppAddTodo.vue";
import AppFooter from "@/components/main/AppFooter.vue";
import {Todo} from "@/types/todo";
import {Filter} from "@/types/Filters";
import {Stats} from "@/types/Stats";

const todos = ref<Todo[]>([
  {id: 0, text: 'hello', completed: true},
  {id: 1, text: 'world', completed: false},
  {id: 2, text: 'vue', completed: false},
])
const activeFilter = ref<Filter>('All')

const activeTodos = computed<Todo[]>(() => {
  return todos.value.filter(el => !el.completed)
})

const doneTodos = computed<Todo[]>(() => {
  return todos.value.filter(el => el.completed)
})

const filterTodos = computed<Todo[]>(() => {
  if (activeFilter.value === 'Active') return activeTodos.value;
  if (activeFilter.value === 'Done') return doneTodos.value;
  return todos.value
})

const stats = computed<Stats>(() => {
  return {
    active: activeTodos.value.length,
    done: doneTodos.value.length
  }
})

const toggleTodo = (id: number) => {
  const targetTodo = todos.value.find((todo: Todo) => todo.id === id)

  if (targetTodo) {
    targetTodo.completed = !targetTodo.completed
  }
}

const removeTodo = (id: number) => {
  todos.value = todos.value.filter((todo: Todo) => todo.id !== id)
}

const addTodo = (todo: Todo) => {
  todos.value.push(todo)
}

const changeActiveFilter = (filter: Filter) => {
  activeFilter.value = filter
}
</script>

<template>
  <app-header/>
  <app-filters :active-filter="activeFilter" @changeActiveFilter="changeActiveFilter"/>
  <main class="app-main">
    <app-todo-list :todos="filterTodos" @toggleTodo="toggleTodo" @removeTodo="removeTodo"/>
    <app-add-todo @addTodo="addTodo"/>
  </main>
  <app-footer :stats="stats"/>
</template>

<style>
.app-main {
  display: grid;
  gap: 1.6rem;
}
</style>