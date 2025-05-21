<template>
  <div class="sort">
    <button
      v-for="field in fields"
      :key="field.key"
      class="sort__button"
      :class="{ 'sort__button--active': activeSort?.key === field.key }"
      @click="updateSort(field)"
    >
      {{ field.value }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Field } from '../types/types';

interface SortListEmits {
  (e: 'update:sort', value: string): void
}

const emit = defineEmits<SortListEmits>();

const activeSort = ref<Field | null>(null);

const fields: Field[] = [
  { key: "name", value: "Name" },
  { key: "climate", value: "Climate" },
  { key: "gravity", value: "Gravity" },
  { key: "population", value: "Population" },
  { key: "rotation_period", value: "Rotation" },
  { key: "created", value: "Created" },
];

const updateSort = (field: Field) => {
  activeSort.value = activeSort.value?.key === field.key
    ? null
    : field;
  emit('update:sort', field.key);
}
</script>
