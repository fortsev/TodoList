<script setup lang="ts">
import {computed, defineProps} from "vue";
import {Filter} from "@/types/Filters";
import {Stats} from "@/types/Stats";

const props = defineProps<{
  activeFilter: Filter;
  filter: Filter;
  stats: Stats;
}>();

const counter = computed(() => {
  if (!props.stats) return 0;

  if (props.filter.code === 'done') {
    return props.stats.done
  }

  if (props.filter.code === 'active') {
    return props.stats.active
  }

  return 0
})

const isActiveFilter = computed(() => {
  return props.activeFilter.code === props.filter.code
})
</script>

<template>
  <button
      class="button"
      :class="{'button--primary': isActiveFilter}">
    {{ filter.name }} <template v-if="counter">({{ counter }})</template>
  </button>
</template>