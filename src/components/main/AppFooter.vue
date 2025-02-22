<script setup lang="ts">
import {PropType, defineProps} from "vue";
import {Stats} from "@/types/Stats";

const props = defineProps({
  stats: {
    type: Object as PropType<Stats>,
    required: true,
  }
})
</script>

<template>
  <footer class="app-footer">{{ props.stats.active }} more to do, {{ props.stats.done }} done</footer>
</template>

<style scoped lang="scss">
.app-footer {
  font-size: 1.4rem;
  text-align: center;
  color: var(--secondary-color)
}
</style>