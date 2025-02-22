<script setup lang="ts">
import {ref, defineEmits, defineProps} from "vue";
import {Filter} from "@/types/Filters";

const props = defineProps<{
  activeFilter: Filter;
}>();

const filters = ref<Filter[]>(['All', 'Active', 'Done'])

const emit = defineEmits({
  changeActiveFilter: (filter: Filter) => filter
})

const changeFilter = (filter: Filter) => {
  emit('changeActiveFilter', filter);
};
</script>

<template>
  <aside class="app-filters">
    <section class="toggle-group">
      <button
          v-for="(el, i) in filters"
          :key="i"
          class="button"
          :class="{'button--primary': props.activeFilter === el}"
          @click="changeFilter(el)">
        {{ el }}
      </button>
    </section>
  </aside>
</template>

<style scoped lang="scss">
.app-filters {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.toggle-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  box-sizing: border-box;
  border: 0.1rem solid var(--light-color);
  border-radius: 1.6rem;

  .button {
    font-size: 1.6rem;

    &:not(.button--primary):hover {
      color: var(--primary-color);
    }
  }
}
</style>