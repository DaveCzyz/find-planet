<template>
  <div class="sort">
    <button
      v-for="{ key, value } in fields"
      :key="key"
      class="sort__button"
      :class="{ 'sort__button--active': activeSort === key }"
      @click="updateSort(key as keyof Field)"
    >
      {{ value }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Field } from '../types/types';

interface SortListEmits {
  (e: 'update:sort', value: keyof Field): void
}

const emit = defineEmits<SortListEmits>();

const activeSort = ref<string | null>(null);

const fields: Field[] = [
  { key: "name", value: "Name" },
  { key: "climate", value: "Climate" },
  { key: "gravity", value: "Gravity" },
  { key: "population", value: "Population" },
  { key: "rotation_period", value: "Rotation" },
  { key: "created", value: "Created" },
];

const updateSort = (field: keyof Field) => {
  activeSort.value = activeSort.value === field
    ? null
    : field;
  emit('update:sort', field);
}
</script>
