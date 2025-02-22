<script setup lang="ts">
import {defineEmits, defineProps} from "vue";
import AppFilterButton from "@/components/filter/AppFilterButton.vue";
import {Filter} from "@/types/Filters";
import {Stats} from "@/types/Stats";

const props = defineProps<{
  activeFilter: Filter;
  filters: Filter[];
  stats: Stats;
}>();

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
      <app-filter-button
          v-for="filter in filters"
          :key="filter.code"
          :filter="filter"
          :stats="props.stats"
          :active-filter="props.activeFilter"
          @click="changeFilter(filter)"
      />
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