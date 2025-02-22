<script setup lang="ts">
import {PropType, defineProps, defineEmits} from "vue";
import AppTodoItem from "@/components/todo/AppTodoItem.vue";
import {Film} from "@/types/Films";
import {TodoActions} from "@/types/TodoEmits";

const props = defineProps({
  todos: {
    type: Array as PropType<Film[]>,
    required: true,
  }
})

const emit = defineEmits<(e: TodoActions, id: number) => void>();

const toggleTodo = (id: number) => {
  emit('toggleTodo', id)
}
const removeTodo = (id: number) => {
  emit('removeTodo', id)
}
</script>

<template>
  <ul class="todo-list">
    <app-todo-item
        v-for="todo in props.todos"
        :key="todo.id"
        :todo="todo"
        @toggleTodo="toggleTodo"
        @removeTodo="removeTodo"/>
  </ul>
</template>

<style scoped lang="scss">
.todo-list {
  display: grid;
  gap: 1.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>