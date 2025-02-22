<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/main/AppHeader.vue";
import AppFilters from "@/components/AppFilters.vue";
import AppTodoList from "@/components/todo/AppTodoList.vue";
import AppAddTodo from "@/components/AppAddTodo.vue";
import AppFooter from "@/components/main/AppFooter.vue";
import {Todo} from "@/types/todo";
import {Filter} from "@/types/Filters";
import {Stats} from "@/types/Stats";

interface State {
  todos: Todo[],
  activeFilter: Filter,
}
export default defineComponent({
  components: {
    AppHeader,
    AppFilters,
    AppTodoList,
    AppAddTodo,
    AppFooter
  },
  data(): State {
    return {
      todos: [
        { id: 0, text: 'hello', completed: true },
        { id: 1, text: 'world', completed: false },
        { id: 2, text: 'vue', completed: false },
      ],
      activeFilter: 'All',
    }
  },
  computed: {
    activeTodos():Todo[] {
      return this.todos.filter(el => !el.completed)
    },
    doneTodos(): Todo[] {
      return this.todos.filter(el => el.completed)
    },
    filterTodos():Todo[] {
      if (this.activeFilter === 'Active') return this.activeTodos
      if (this.activeFilter === 'Done') return this.doneTodos
      return this.todos
    },
    stats(): Stats {
      return {
        active: this.activeTodos.length,
        done: this.doneTodos.length
      }
    }
  },
  methods: {
    toggleTodo(id: number) {
      const targetTodo = this.todos.find((todo: Todo) => todo.id === id)

      if (targetTodo) {
        targetTodo.completed = !targetTodo.completed
      }
    },
    removeTodo(id: number) {
      this.todos = this.todos.filter((todo: Todo) => todo.id !== id)
    },
    addTodo(todo: Todo) {
      this.todos.push(todo)
    },
    changeActiveFilter(filter: Filter) {
      this.activeFilter = filter
    }
  }
})
</script>

<template>
  <app-header />
  <app-filters :active-filter="activeFilter" @changeActiveFilter="changeActiveFilter"/>
  <main class="app-main">
    <app-todo-list :todos="filterTodos" @toggleTodo="toggleTodo" @removeTodo="removeTodo" />
    <app-add-todo @addTodo="addTodo" />
  </main>
  <app-footer :stats="stats" />
</template>

<style>
.app-main {
  display: grid;
  gap: 1.6rem;
}
</style>