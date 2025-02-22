<script setup lang="ts">
import {ref, defineEmits} from "vue";
import {Todo} from "@/types/todo";

const isFormVisible = ref<boolean>(false);
const todoText = ref<string>('');

const emits = defineEmits<(e: 'addTodo', todo: Todo) => void>();

const addTodo = () => {
    emits('addTodo', {
        id: Date.now(),
        text: todoText.value,
        completed: false,
    })
    todoText.value = '';
}

const showForm = () => {
    isFormVisible.value = true;
}

const closeForm = () => {
  isFormVisible.value = false;
}

</script>

<template>
  <section class="add-todo">
    <form v-if="isFormVisible" class="add-todo__form" @submit.prevent="addTodo">
      <button class="close-button" type="button" @click="closeForm">
        <i class="bi bi-x"></i>
      </button>
      <div class="text-input text-input--focus">
        <input v-model="todoText" class="input"/>
      </div>
      <button class="button button--filled">Add task</button>
    </form>
    <button v-else class="add-todo__show-form-button" @click="showForm">
      <i class="bi bi-plus-lg"></i>
    </button>
  </section>
</template>

<style scoped lang="scss">
.add-todo {
  display: grid;
  gap: 1.6rem;

  &__show-form-button {
    grid-template-columns: 1fr;
    justify-items: center;
    padding: 1.2rem 1.4rem;
    color: var(--primary-color);
    font-size: 1.9rem;
    border: 0.1rem solid var(--light-color);
    border-radius: 1.6rem;
    transition: box-shadow 0.2s;

    &:hover {
      box-shadow: 0 1px 20px rgb(240 240 240 / 80%);
    }
  }

  &__form {
    display: grid;
    gap: 1.6rem;
    padding: 1.4rem 1.6rem 2rem;
    border: 0.1rem solid var(--light-color);
    border-radius: 1.6rem;
    box-shadow: 0 1px 20px rgb(240 240 240 / 80%);

    .close-button {
      justify-self: end;
      font-size: 2rem;

      &:hover {
        color: var(--primary-color);
      }
    }
  }
}

.text-input {
  display: flex;
  align-items: center;
  padding: 0.8rem 1.6rem;
  box-sizing: border-box;
  font: inherit;
  font-size: 1.6rem;
  border: 0.1rem solid var(--light-color);
  border-radius: 1.6rem;

  &--focus {
    border: 0.2rem solid var(--primary-color);
  }

  .input {
    flex-grow: 1;
    padding: 0;
    border: none;

    &:focus {
      outline: none;
    }
  }

  &--search::after {
    content: '\F52A';
    font-family: bootstrap-icons !important;
    font-size: 1.7rem;
    color: var(--primary-color)
  }
}
</style>