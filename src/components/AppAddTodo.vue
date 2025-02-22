<script setup lang="ts">
import {ref, defineEmits} from "vue";
import {Film} from "@/types/Films";
import films from "@/api/services/films";
import AppTodoItem from "@/components/todo/AppTodoItem.vue";

const isFormVisible = ref<boolean>(false);
const searchText = ref<string>('');

const emits = defineEmits<(e: 'addTodo', film: Film) => void>();

const addTodo = (film:Film) => {
  emits('addTodo', film)
  searchText.value = '';
  closeForm();
}

const searchResult = ref<Film[]>([])

const searchFilm = async () => {
  try {
    const res = await films.searchMovie(searchText.value)
    searchResult.value = res.data.docs
  } catch (e) {
    console.error('Ошибка при выполнении запроса поиска, ', e)
  }
}

let timeoutId: number | null = null;

const debounceSearch = () => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    searchFilm();
  }, 300);
};

const showForm = () => {
  isFormVisible.value = true;
}

const closeForm = () => {
  isFormVisible.value = false;
  searchResult.value = []
}
</script>

<template>
  <section class="add-todo">
    <div v-if="isFormVisible" class="add-todo__form">
      <button class="close-button" type="button" @click="closeForm">
        <i class="bi bi-x"></i>
      </button>
      <div class="text-input text-input--focus">
        <input v-model="searchText" class="input" @input="debounceSearch"/>
      </div>
      <div v-if="searchResult.length > 0" class="add-todo__films">
        <app-todo-item v-for="film in searchResult" :key="film.id" :todo="film" @click="addTodo(film)" />
      </div>
    </div>
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

  &__films {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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