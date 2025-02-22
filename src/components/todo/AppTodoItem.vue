<script setup lang="ts">
import {PropType, defineProps, defineEmits} from "vue";
import {Film} from "@/types/Films";
import {TodoActions} from "@/types/TodoEmits";

const props = defineProps({
  todo: {
    type: Object as PropType<Film>,
    required: true,
  }
})

const emit = defineEmits<(
    e: TodoActions, id: number) => void
>()

const toggleTodo = () => {
  emit('toggleTodo', props.todo.id)
}
const removeTodo = () => {
  emit('removeTodo', props.todo.id)
}
</script>

<template>
  <li class="todo-item" :class="{ 'todo-item--done': todo.viewed }" @click="toggleTodo">
    <div class="todo-item__status">
      <i class="bi bi-check2"></i>
    </div>
    <span class="todo-item__text" :title="todo.description">{{ todo.name }} ({{ todo.year }})</span>
    <button class="todo-item__remove-button" @click.stop="removeTodo">
      <i class="bi bi-trash3"></i>
    </button>
  </li>
</template>

<style scoped lang="scss">
.todo-item {
  display: grid;
  grid-template-columns: 2.4rem 1fr 1.6rem;
  align-items: center;
  gap: 1.6rem;
  padding: 1.6rem 2rem;
  border: 0.1rem solid var(--light-color);
  border-radius: 1.6rem;
  transition: box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 1px 20px rgb(240 240 240 / 80%);

    .todo-item__status {
      opacity: 1;
    }

    .todo-item__remove-button {
      opacity: 1;
    }
  }

  &__text {
    font-weight: 400;
  }

  &__status {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.4rem;
    height: 2.4rem;
    font-size: 2.4rem;
    opacity: 0;
    transition: opacity 0.2s;

    .bi-check2 {
      position: relative;
      top: 0.1rem;
      color: var(--primary-color)
    }
  }

  &__remove-button {
    opacity: 0;
    color: var(--secondary-color);
    transition: opacity 0.2s;

    &:hover {
      color: var(--primary-color);
    }
  }

  &--done {
    .todo-item__text {
      text-decoration: line-through;
    }

    .todo-item__status {
      opacity: 1;

      .bi-check2 {
        display: block;
      }
    }
  }
}
</style>